import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectApi, ProjectApiRes } from '@/api/project';
import toast from 'react-hot-toast';

export default function StudentProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectApiRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchProjectAndStatus = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [projectData, statusData] = await Promise.allSettled([
          projectApi.getProjectById(id),
          projectApi.getApplicationStatus(id),
        ]);

        if (projectData.status === 'fulfilled') {
          setProject(projectData.value);
        } else {
          throw projectData.reason;
        }

        if (statusData.status === 'fulfilled') {
          setApplicationStatus(statusData.value.status);
        }
      } catch (error) {
        console.error('Failed to fetch project detail:', error);
        toast.error('Failed to load mission details.');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjectAndStatus();
  }, [id, navigate]);

  const handleApply = async () => {
    if (!project) return;
    try {
      setApplying(true);
      await projectApi.applyToProject(project.id);
      setApplicationStatus('APPLIED');
      toast.success('Successfully applied for the mission!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to apply for the mission.';
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  const parseSkills = (skillsStr: string) => {
    if (!skillsStr) return [];
    return skillsStr.split(/[;,]/).map(s => s.trim()).filter(Boolean);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
    });
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rocket"></div>
      </div>
    );
  }

  if (!project) return null;

  const skills = parseSkills(project.requiredSkills);
  const durationStr = `${formatDate(project.startTime)} - ${formatDate(project.endTime)}`;
  const formattedDeadline = formatDate(project.startTime); // Using start time as a mock deadline for now

  return (
    <div className="min-h-full bg-white">
      {/* Top strip */}
      <div className="px-8 pt-8 pb-0 flex items-center gap-4 max-w-7xl mx-auto">
        <button onClick={() => navigate('/projects')} className="text-gray-400 hover:text-darkside transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
          project.status === 'APPROVED' ? 'bg-yoda/10 text-yoda' : 'bg-orange-50 text-orange-500'
        }`}>
          {project.status}
        </span>
        <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">Mission Code: MHX-{project.id}</span>
      </div>

      <div className="px-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 pt-5 pb-16 max-w-7xl mx-auto">
        {/* Left content */}
        <div>
          <h1 className="text-5xl font-extrabold text-darkside tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-80">
            <img
              src={`https://picsum.photos/seed/${project.id}/800/400`}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <p className="text-white font-bold text-sm">Summer Campaign 2026</p>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-darkside mb-4">Mission Overview</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">{project.description}</p>
          </section>

          {/* Objectives */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-darkside mb-4">Project Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-rocket text-xl mb-3">
                  🏘️
                </div>
                <h4 className="font-bold text-darkside mb-1">Community Support</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Direct engagement with local residents to solve pressing infrastructure or educational needs.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-rocket text-xl mb-3">
                  🌱
                </div>
                <h4 className="font-bold text-darkside mb-1">Sustainable Growth</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Projects designed for long-term self-sufficiency and positive environmental impact.</p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-darkside mb-4">Who We're Looking For</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="flex items-center gap-2 bg-indigo-50 text-rocket font-bold text-sm px-4 py-2 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-rocket inline-block"></span>
                  {s.toUpperCase()}
                </span>
              ))}
            </div>
          </section>

          {/* Community banner */}
          <div className="flex items-center gap-4 border-t border-gray-100 pt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${(project.id % 50) + i}`}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="volunteer"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-rocket flex items-center justify-center text-white text-xs font-bold">
                +12
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-darkside text-base">Join the movement</p>
              <p className="text-sm text-gray-500">A community of builders and leaders ready for {project.title}.</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-[32px] p-6 space-y-6 border border-gray-100">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mission Parameters</p>
              {[
                { icon: '📅', label: 'Duration', value: durationStr },
                { icon: '👥', label: 'Availability', value: `${project.amountOfParticipants} Slots` },
                { icon: '⭐', label: 'Leadership', value: project.leaderName },
              ].map(row => (
                <div key={row.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-lg shrink-0">
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-1">{row.label}</p>
                    <p className="text-xs font-bold text-darkside">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <button
                disabled={!!applicationStatus || applying}
                onClick={handleApply}
                className={`w-full text-white font-bold py-4 rounded-2xl text-base shadow-xl transition-all active:scale-95 ${
                  applicationStatus
                    ? 'bg-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-rocket shadow-rocket/20 hover:bg-indigo-700'
                }`}
              >
                {applying ? 'Processing...' : applicationStatus ? `Status: ${applicationStatus}` : 'Apply for Mission'}
              </button>
              <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">Application ends: {formattedDeadline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
