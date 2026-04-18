type MissionCard = {
  region: string;
  title: string;
  tags: string[];
  status: 'Approved' | 'Pending';
  image: string;
};

const filterOptions = {
  location: ['All Locations', 'Tra Vinh Province', 'Kon Tum Highlands', 'Ben Tre Delta', 'Quang Nam Heritage'],
  skills: ['All Skills', 'Teaching', 'Construction', 'Medical', 'Arts', 'Engineering', 'Community'],
};

const missions: MissionCard[] = [
  {
    region: 'Tra Vinh Province',
    title: 'Green Schools Initiative',
    tags: ['Teaching', 'Community'],
    status: 'Approved',
    image: 'https://picsum.photos/seed/mission-1/800/520',
  },
  {
    region: 'Kon Tum Highlands',
    title: 'Infrastructure Support',
    tags: ['Construction', 'Engineering'],
    status: 'Approved',
    image: 'https://picsum.photos/seed/mission-2/800/520',
  },
  {
    region: 'Ben Tre Delta',
    title: 'Medical Outreach 2024',
    tags: ['Medical', 'Elderly Care'],
    status: 'Approved',
    image: 'https://picsum.photos/seed/mission-3/800/520',
  },
  {
    region: 'Quang Nam Heritage',
    title: 'Cultural Arts Program',
    tags: ['Arts', 'History'],
    status: 'Approved',
    image: 'https://picsum.photos/seed/mission-4/800/520',
  },
];

function SelectField({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="px-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
      <div className="relative">
        <select
          defaultValue={value}
          className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-[0.98rem] text-[#151b2a] shadow-[0_10px_30px_-28px_rgba(15,23,42,0.45)] outline-none transition focus:border-[#564af7] focus:ring-4 focus:ring-[#564af7]/10"
        >
          {label === 'Location'
            ? filterOptions.location.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            : filterOptions.skills.map((option) => (
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

function MissionCard({ mission }: { mission: MissionCard }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_16px_40px_-32px_rgba(15,23,42,0.5)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-28px_rgba(15,23,42,0.55)]">
      <div className="relative p-6 pb-5">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={mission.image} alt={mission.title} className="h-44 w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-lg bg-[#0fb328]/10 px-3 py-1 text-xs font-bold text-[#0fb328] backdrop-blur-md">
            {mission.status}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-400">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-slate-300" />
          {mission.region}
        </div>

        <h3 className="text-[1.45rem] font-medium leading-tight text-[#151b2a]">{mission.title}</h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {mission.tags.map((tag) => (
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
            className="rounded-2xl border-2 border-[#564af7]/20 px-4 py-3 text-[0.98rem] font-medium text-[#564af7] transition hover:bg-[#f2f3ff]"
          >
            Pending
          </button>
          <button
            type="button"
            className="rounded-2xl border-2 border-[#564af7]/20 px-4 py-3 text-[0.98rem] font-medium text-[#564af7] transition hover:bg-[#f2f3ff]"
          >
            List
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MissionBoard() {
  return (
    <section className="min-h-[calc(100vh-2rem)] bg-[linear-gradient(180deg,#f7f8ff_0%,#ffffff_18%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <header className="max-w-4xl space-y-5 pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#564af7]">Mission Board</p>
          <h1 className="text-[clamp(2.8rem,6vw,4.75rem)] font-light leading-none tracking-[-0.04em] text-[#151b2a]">
            Explore Missions
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            Join thousands of students in the Mua Hè Xanh movement. Filter by your expertise or preferred location
            to find the mission that resonates with your purpose.
          </p>
        </header>

        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
          <SelectField label="Location" value="All Locations" />
          <SelectField label="Skills" value="All Skills" />

          <button
            type="button"
            className="h-14 rounded-2xl bg-[#e2e7fd] px-8 text-[0.98rem] font-bold text-[#564af7] shadow-[0_16px_34px_-28px_rgba(86,74,247,0.65)] transition hover:bg-[#d8dffb] lg:min-w-[10rem]"
          >
            Apply Filters
          </button>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {missions.map((mission) => (
            <MissionCard key={mission.title} mission={mission} />
          ))}
        </section>
      </div>
    </section>
  );
}
