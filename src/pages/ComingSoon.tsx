import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/api/axiosInstance';

// --- TYPES ---
export interface Project {
  id: number;
  title: string;
  description: string;
  requiredSkills: string;
  startTime: string;
  endTime: string;
  amountOfParticipants: number;
  status: string;
  leaderId: number;
  leaderName: string;
  createdAt: string;
}

export interface Application {
  id: number;
  projectId: number;
  projectTitle: string;
  studentId: number;
  studentName: string;
  status: 'APPLIED' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
}

// --- TAB: MAIN PROJECTS ---
const ProjectsView: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Depending on backend, might be response.data or response.data.data. Using response.data as per API Guide.
      const response = await axiosInstance.get('/v1/projects');
      const data = response.data?.data || response.data; // fallback for both structures
      setProjects(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) return <LoadingSkeleton count={3} />;
  if (error) return <ErrorState message={error} onRetry={fetchProjects} />;
  if (projects.length === 0) return <EmptyState customMessage="No projects available." />;

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 block hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-darkside leading-tight">{project.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                  Leader: {project.leaderName}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                  Limit: {project.amountOfParticipants} limit
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                  Starts: {formatDate(project.startTime)}
                </span>
              </div>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              project.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
              project.status === 'APPROVED' ? 'bg-blue-100 text-blue-700' :
              project.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {project.status || 'UNKNOWN'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- TAB: PENDING APPLICATIONS ---
const ApplicationsView: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get('/v1/projects/applications/pending');
      const data = response.data?.data || response.data;
      setApplications(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleReview = async (applicationId: number, newStatus: 'ACCEPTED' | 'REJECTED') => {
    const minToastId = toast.loading(`Processing application...`);
    try {
      await axiosInstance.patch(`/v1/projects/applications/${applicationId}/status`, {
        status: newStatus
      });
      toast.success(`Application ${newStatus.toLowerCase()} successfully!`, { id: minToastId });
      // Remove from list or update locally
      setApplications((prev) => prev.filter(app => app.id !== applicationId));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to change status.', { id: minToastId });
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) return <LoadingSkeleton count={3} />;
  if (error) return <ErrorState message={error} onRetry={fetchApplications} />;
  if (applications.length === 0) return <EmptyState customMessage="No pending applications awaiting your review." />;

  return (
    <div className="flex flex-col gap-4">
      {applications.map((app) => (
        <div key={app.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-darkside leading-tight">{app.studentName}</h3>
              <span className="bg-amber-100 text-amber-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {app.status}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">
              Applying for: <span className="text-darkside">{app.projectTitle}</span>
            </p>
            <div className="text-xs text-gray-400">
              Applied At: {formatDate(app.appliedAt)}
            </div>
          </div>
          
          <div className="flex md:flex-col gap-3 shrink-0 md:w-32">
            <button
              onClick={() => handleReview(app.id, 'ACCEPTED')}
              className="flex-1 md:flex-none bg-yoda/10 text-yoda font-bold py-2.5 px-4 rounded-xl text-sm hover:bg-yoda hover:text-white transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() => handleReview(app.id, 'REJECTED')}
              className="flex-1 md:flex-none border border-red-200 text-red-500 font-bold py-2.5 px-4 rounded-xl text-sm hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


// --- SHARED UI COMPONENTS ---
const LoadingSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4 py-2">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="flex gap-4 pt-2">
            <div className="h-6 bg-gray-50 rounded w-28"></div>
            <div className="h-6 bg-gray-50 rounded w-28"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState: React.FC<{ customMessage: string }> = ({ customMessage }) => (
  <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-100 border-dashed flex flex-col items-center justify-center">
    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5">
      <svg className="w-10 h-10 text-yoda" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-darkside mb-2">All Caught Up!</h3>
    <p className="text-gray-500 max-w-sm">{customMessage}</p>
  </div>
);

const ErrorState: React.FC<{ message: string, onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="flex items-start gap-4">
      <svg className="w-6 h-6 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <h3 className="font-bold mb-1">Error Loading Data</h3>
        <p className="text-sm mt-1">{message}</p>
      </div>
    </div>
    <button onClick={onRetry} className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-200">
      Try Again
    </button>
  </div>
);


// --- MAIN PORTAL COMPONENT ---
type TabType = 'PROJECTS' | 'APPLICATIONS';

export default function ComingSoon() {
  const [activeTab, setActiveTab] = useState<TabType>('PROJECTS');

  return (
    <div className="min-h-full py-10 px-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-darkside tracking-tight mb-3">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 font-medium">
            Manage existing projects and review new student applications.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <button
          onClick={() => setActiveTab('PROJECTS')}
          className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'PROJECTS'
              ? 'bg-darkside text-white shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => setActiveTab('APPLICATIONS')}
          className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'APPLICATIONS'
              ? 'bg-darkside text-white shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Pending Applications
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {activeTab === 'PROJECTS' && <ProjectsView />}
        {activeTab === 'APPLICATIONS' && <ApplicationsView />}
      </div>
    </div>
  );
}
