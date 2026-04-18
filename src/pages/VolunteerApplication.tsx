import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectApi, ProjectApplicationRes, ProjectMemberRes } from '@/api/project';
import toast from 'react-hot-toast';

type UnifiedApplicant = {
  id: number; // applicationId for pending, studentId for accepted
  studentId: number;
  name: string;
  status: string;
  avatar: string;
  skills: string[];
};

function ApplicantCard({ 
  applicant, 
  type, 
  onAction 
}: { 
  applicant: UnifiedApplicant, 
  type: string, 
  onAction: (id: number, action: 'ACCEPTED' | 'REJECTED' | 'BAN') => void 
}) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_28px_-24px_rgba(15,23,42,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <img className="h-20 w-20 rounded-2xl bg-slate-100 object-cover" src={applicant.avatar} alt={applicant.name} />
        <span className={`rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] ${
          type === 'pending' ? 'bg-orange-100/50 text-amber-600' : 'bg-green-100/50 text-emerald-600'
        }`}>
          {applicant.status}
        </span>
      </div>

      <div>
        <h3 className="m-0 text-lg font-bold text-[#151b2a]">{applicant.name}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {applicant.skills.map((skill) => (
          <span key={skill} className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2.5">
        {type === 'pending' ? (
          <>
            <button
              onClick={() => onAction(applicant.id, 'ACCEPTED')}
              className="rounded-xl bg-green-500/10 px-2 py-2.5 text-[0.82rem] font-bold text-green-600 transition hover:bg-green-500 hover:text-white"
            >
              Accept
            </button>
            <button
              onClick={() => onAction(applicant.id, 'REJECTED')}
              className="rounded-xl bg-red-500/10 px-2 py-2.5 text-[0.82rem] font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
            >
              Reject
            </button>
          </>
        ) : (
          <button
            onClick={() => onAction(applicant.studentId, 'BAN')}
            className="col-span-2 rounded-xl bg-red-500/10 px-2 py-2.5 text-[0.82rem] font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            Remove from Project
          </button>
        )}
      </div>
    </article>
  );
}

export default function VolunteerApplication() {
  const { projectId, type } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<UnifiedApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectTitle, setProjectTitle] = useState('Loading...');

  const fetchData = async () => {
    if (!projectId || !type) return;
    try {
      setLoading(true);
      if (type === 'pending') {
        const allPending = await projectApi.getPendingApplications();
        const filtered = allPending.filter(app => String(app.projectId) === projectId);
        if (filtered.length > 0) setProjectTitle(filtered[0].projectTitle);
        
        setList(filtered.map(app => ({
          id: app.id,
          studentId: app.studentId,
          name: app.studentName,
          status: 'Pending Review',
          avatar: `https://i.pravatar.cc/150?u=${app.studentId}`,
          skills: ['Volunteer', 'Dedicated'] // Skills usually come from student profile, mock for now
        })));
      } else {
        const members = await projectApi.getAcceptedStudents(projectId);
        setList(members.map(m => ({
          id: m.studentId, // No applicationId for accepted members
          studentId: m.studentId,
          name: m.fullName,
          status: 'Member',
          avatar: `https://i.pravatar.cc/150?u=${m.studentId}`,
          skills: ['Verified Volunteer']
        })));
        
        // Also get project detail for title
        const proj = await projectApi.getProjectById(projectId);
        setProjectTitle(proj.title);
      }
    } catch (error) {
      console.error('Failed to fetch volunteers:', error);
      toast.error('Failed to load volunteer data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId, type]);

  const handleAction = async (id: number, action: 'ACCEPTED' | 'REJECTED' | 'BAN') => {
    try {
      if (action === 'BAN') {
        await projectApi.banStudent(projectId!, id);
        toast.success('Volunteer removed from project.');
      } else {
        await projectApi.reviewApplication(id, action);
        toast.success(`Application ${action === 'ACCEPTED' ? 'accepted' : 'rejected'}.`);
      }
      fetchData(); // Refresh
    } catch (error) {
      console.error('Action failed:', error);
      toast.error('Action failed. Please try again.');
    }
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] w-full px-6 pt-6">
      <div className="flex w-full flex-col gap-7">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="text-left">
            <button onClick={() => navigate('/leader/dashboard')} className="mb-4 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider">Back to Board</span>
            </button>
            <h1 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-none text-[#151b2a]">
              {type === 'pending' ? 'Pending Requests' : 'Accepted Team'}
            </h1>
            <p className="mt-4 max-w-[46rem] text-[1.05rem] leading-[1.65] text-slate-500">
              {type === 'pending' 
                ? `Carefully review candidates applying for the ` 
                : `Currently active volunteers deployed for the `}
              <span className="text-indigo-600 font-bold">{projectTitle}</span> project.
            </p>
          </div>

          <div className="flex w-full gap-3 md:w-auto">
             <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 flex flex-col items-center">
                <span className="text-2xl font-black text-indigo-600">{list.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total {type}</span>
             </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            No {type} volunteers found for this project.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {list.map((applicant) => (
              <ApplicantCard 
                key={applicant.studentId} 
                applicant={applicant} 
                type={type!} 
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

