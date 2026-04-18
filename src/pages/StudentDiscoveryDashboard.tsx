import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectApi, ProjectApiRes } from '@/api/project';
import toast from 'react-hot-toast';

const SKILL_OPTIONS = ['All Skills', 'Teaching', 'Construction', 'Medical', 'Arts', 'Engineering', 'Environment', 'Media', 'Logistics'];

export default function StudentDiscoveryDashboard() {
  const navigate = useNavigate();
  const [skill, setSkill] = useState('All Skills');
  const [projects, setProjects] = useState<ProjectApiRes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectApi.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Failed to load missions.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const parseSkills = (skillsStr: string) => {
    if (!skillsStr) return [];
    return skillsStr.split(/[;,]/).map(s => s.trim()).filter(Boolean);
  };

  const filtered = projects.filter(p => {
    // Only show projects that are APPROVED
    if (p.status !== 'APPROVED') return false;
    
    const pSkills = parseSkills(p.requiredSkills);
    const matchSkill = skill === 'All Skills' || pSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()));
    
    return matchSkill;
  });

  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      {/* Header */}
      <h1 className="text-6xl font-extrabold text-darkside tracking-tight leading-none mb-4">
        Explore Missions
      </h1>
      <p className="text-base text-gray-500 max-w-lg mb-10">
        Join thousands of students in the Mua Hè Xanh movement. Filter by your expertise to find the mission that resonates with your purpose.
      </p>

      {/* Filters */}
      <div className="flex items-end gap-4 mb-10">
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Skills</label>
          <div className="relative">
            <select
              value={skill}
              onChange={e => setSkill(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-darkside font-medium focus:outline-none focus:ring-2 focus:ring-rocket pr-10 cursor-pointer"
            >
              {SKILL_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <button className="bg-rocket/10 text-rocket font-bold px-6 py-3 rounded-xl text-sm hover:bg-rocket hover:text-white transition-all">
          Apply Filters
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rocket"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-medium bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
          No missions found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* Cards Grid */}
          {filtered.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={`https://picsum.photos/seed/${project.id}/400/220`}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yoda/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  {project.status}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-darkside leading-tight mb-3">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {parseSkills(project.requiredSkills).slice(0, 3).map(s => (
                    <span key={s} className="text-[11px] font-semibold text-gray-500 border border-gray-200 px-2.5 py-0.5 rounded-full bg-gray-50">
                      {s.toUpperCase()}
                    </span>
                  ))}
                  {parseSkills(project.requiredSkills).length > 3 && (
                    <span className="text-[11px] font-semibold text-gray-400 border border-transparent px-1 py-0.5">
                      +{parseSkills(project.requiredSkills).length - 3}
                    </span>
                  )}
                </div>
                <button
                  className="mt-auto w-full border border-gray-200 text-rocket font-bold py-2.5 rounded-xl text-sm hover:bg-rocket hover:text-white hover:border-rocket transition-all"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
