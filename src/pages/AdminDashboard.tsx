import { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { projectsApi, Project } from '@/api/projects';
import { Button } from '@/components/ui/Button';

const PROJECT_STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED'] as const;

type ProjectStatus = typeof PROJECT_STATUSES[number];

const STATUS_COLORS: Record<ProjectStatus, { bg: string; text: string; dot: string }> = {
  PENDING: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  APPROVED: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  REJECTED: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400' },
  IN_PROGRESS: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400' },
  COMPLETED: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-400' },
};

interface ProjectWithLoading extends Project {
  isUpdating?: boolean;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectWithLoading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await projectsApi.getAllProjects();
      setProjects(data || []);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load projects';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (projectId: number, newStatus: string) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;

    const project = projects[projectIndex];

    // Update UI optimistically
    setProjects(prev => {
      const updated = [...prev];
      updated[projectIndex] = { ...project, isUpdating: true };
      return updated;
    });

    const toastId = toast.loading('Updating project status...');

    try {
      const updated = await projectsApi.updateProjectStatus(projectId, newStatus);
      
      // Update with the response from server
      setProjects(prev => {
        const updatedList = [...prev];
        updatedList[projectIndex] = { ...updated, isUpdating: false };
        return updatedList;
      });
      
      toast.success('Project status updated successfully!', { id: toastId });
    } catch (err: any) {
      // Revert to old status on error
      setProjects(prev => {
        const updatedList = [...prev];
        updatedList[projectIndex] = { ...project, isUpdating: false };
        return updatedList;
      });

      const errorMessage = err.response?.data?.message || 'Failed to update project status';
      
      // Show specific error messages
      if (errorMessage.includes('PENDING')) {
        toast.error('Only PENDING projects can be APPROVED or REJECTED', { id: toastId });
      } else {
        toast.error(errorMessage, { id: toastId });
      }
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-rocket animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Admin Panel</p>
        <h1 className="text-6xl font-extrabold text-darkside tracking-tight mb-4">Project Management</h1>
        <p className="text-base text-gray-500 max-w-xl">
          View all projects and manage their status. Update project information and approve or reject pending projects.
        </p>
      </div>

      {/* Error State */}
      {error && !isLoading && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-red-900 mb-1">Error Loading Projects</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button
            onClick={fetchProjects}
            className="text-red-600 hover:text-red-900 font-bold text-sm whitespace-nowrap"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && !error && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-bold text-darkside mb-2">No Projects Found</h3>
          <p className="text-gray-500">There are currently no projects to manage.</p>
        </div>
      )}

      {/* Projects Table */}
      {projects.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4 grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1.2fr_0.8fr] gap-4 items-center font-semibold text-sm text-gray-600 uppercase tracking-wide">
            <div>Project Title</div>
            <div>Leader</div>
            <div>Start Date</div>
            <div>Participants</div>
            <div>Current Status</div>
            <div className="text-right">Action</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {projects.map((project) => {
              const statusColor = STATUS_COLORS[project.status as ProjectStatus];
              return (
                <div
                  key={project.id}
                  className="px-6 py-5 grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1.2fr_0.8fr] gap-4 items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Title */}
                  <div className="min-w-0">
                    <p className="font-semibold text-darkside truncate" title={project.title}>
                      {project.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate" title={project.description}>
                      {project.description}
                    </p>
                  </div>

                  {/* Leader */}
                  <div>
                    <p className="font-medium text-darkside">{project.leaderName}</p>
                    <p className="text-xs text-gray-500">ID: {project.leaderId}</p>
                  </div>

                  {/* Start Date */}
                  <div>
                    <p className="font-medium text-darkside">{formatDate(project.startTime)}</p>
                  </div>

                  {/* Participants */}
                  <div>
                    <p className="font-medium text-darkside">{project.amountOfParticipants}</p>
                  </div>

                  {/* Current Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusColor.dot}`}></span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusColor.bg} ${statusColor.text}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="relative text-right">
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value)}
                      disabled={project.isUpdating}
                      className={`appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-darkside focus:outline-none focus:ring-2 focus:ring-rocket focus:border-rocket transition-all pr-8 cursor-pointer ${
                        project.isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'
                      }`}
                    >
                      {PROJECT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

                    {project.isUpdating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader className="w-4 h-4 text-rocket animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Footer */}
      {projects.length > 0 && (
        <div className="mt-10 grid grid-cols-4 gap-4">
          {(['PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'] as const).map((status) => {
            const count = projects.filter((p) => p.status === status).length;
            const colors = STATUS_COLORS[status];
            return (
              <div
                key={status}
                className={`rounded-2xl p-6 flex items-center gap-4 border border-gray-100 ${colors.bg}`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <span className={`w-3 h-3 rounded-full ${colors.dot}`}></span>
                </div>
                <div>
                  <p className={`text-3xl font-bold ${colors.text}`}>{count}</p>
                  <p className={`text-sm font-medium ${colors.text}`}>{status}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
