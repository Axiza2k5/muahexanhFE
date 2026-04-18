import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectApi, ProjectApiRes } from '@/api/project';
import { userApi } from '@/api/user';
import toast from 'react-hot-toast';

const SKILL_OPTIONS = ['All Skills', 'Teaching', 'Construction', 'Medical', 'Arts', 'Engineering', 'Community'];

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (val: string) => void }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="px-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-[0.98rem] text-[#151b2a] shadow-[0_10px_30px_-28px_rgba(15,23,42,0.45)] outline-none transition focus:border-[#564af7] focus:ring-4 focus:ring-[#564af7]/10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </label>
  );
}

function MissionCard({ mission }: { mission: ProjectApiRes }) {
  const navigate = useNavigate();
  const parseSkills = (skillsStr: string) => {
    if (!skillsStr) return [];
    return skillsStr.split(/[;,]/).map(s => s.trim()).filter(Boolean);
  };

  const tags = parseSkills(mission.requiredSkills);
  const statusFormatted = mission.status.charAt(0) + mission.status.slice(1).toLowerCase();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'IN_PROGRESS':
        return 'bg-[#0fb328]/10 text-[#0fb328]';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-600';
      case 'REJECTED':
        return 'bg-red-500/10 text-red-600';
      default:
        return 'bg-amber-500/10 text-amber-600';
    }
  };

  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_16px_40px_-32px_rgba(15,23,42,0.5)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-28px_rgba(15,23,42,0.55)]">
      <div className="relative p-6 pb-5">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={`https://picsum.photos/seed/${mission.id}/800/520`} alt={mission.title} className="h-44 w-full object-cover" />
          <span className={`absolute left-4 top-4 rounded-lg px-3 py-1 text-xs font-bold backdrop-blur-md ${getStatusStyles(mission.status)}`}>
            {statusFormatted}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-400">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-slate-300" />
          Summer Campaign 2026
        </div>

        <h3 className="text-[1.45rem] font-medium leading-tight text-[#151b2a] line-clamp-2 h-14">{mission.title}</h3>

        <div className="mt-4 flex flex-wrap gap-2 h-16 overflow-hidden">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f2f3ff] px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#564af7]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-2xl border-2 border-amber-500/20 px-4 py-3 text-[0.98rem] font-bold text-amber-600 transition hover:bg-amber-50"
            onClick={() => navigate(`/leader/projects/${mission.id}/volunteers/pending`)}
          >
            View Pending
          </button>
          <button
            type="button"
            className="rounded-2xl border-2 border-emerald-500/20 px-4 py-3 text-[0.98rem] font-bold text-emerald-600 transition hover:bg-emerald-50"
            onClick={() => navigate(`/leader/projects/${mission.id}/volunteers/accepted`)}
          >
            View Accepted
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MissionBoard() {
  const [projects, setProjects] = useState<ProjectApiRes[]>([]);
  const [skill, setSkill] = useState('All Skills');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await userApi.getMyProfile();
        const data = await projectApi.getProjectsByLeader(user.userId);
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Failed to load your missions.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = projects.filter(p => {
    if (skill === 'All Skills') return true;
    return p.requiredSkills.toLowerCase().includes(skill.toLowerCase());
  });

  return (
    <section className="min-h-[calc(100vh-2rem)] bg-[linear-gradient(180deg,#f7f8ff_0%,#ffffff_18%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <header className="max-w-4xl space-y-5 pt-4 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#564af7]">Mission Board</p>
          <h1 className="text-[clamp(2.8rem,6vw,4.75rem)] font-light leading-none tracking-[-0.04em] text-[#151b2a]">
            Explore Missions
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            Manage your Mua Hè Xanh campaigns. Review volunteer applications and track the progress of your active missions.
          </p>
        </header>

        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
          <SelectField label="Skills" value={skill} options={SKILL_OPTIONS} onChange={setSkill} />

          <button
            type="button"
            className="h-14 rounded-2xl bg-[#564af7] px-8 text-[0.98rem] font-bold text-white shadow-[0_16px_34px_-28px_rgba(86,74,247,0.65)] transition hover:bg-[#4539e6] lg:min-w-[10rem]"
          >
            Apply Filters
          </button>
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#564af7]"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
            No missions found. Start by creating a new mission.
          </div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </section>
        )}
      </div>
    </section>
  );
}
