type Applicant = {
  id: number;
  name: string;
  major: string;
  year: string;
  skills: string[];
  avatar: string;
};

const applicants: Applicant[] = [
  {
    id: 1,
    name: 'Minh Anh Nguyen',
    major: 'Computer Science',
    year: 'Year 3',
    skills: ['Web Dev', 'Leadership', 'Fluent EN'],
    avatar: 'https://placehold.co/80x80',
  },
  {
    id: 2,
    name: 'Hoang Viet Le',
    major: 'Foreign Languages',
    year: 'Year 2',
    skills: ['Translation', 'Tutoring', 'Logistics'],
    avatar: 'https://placehold.co/80x80',
  },
  {
    id: 3,
    name: 'Thu Thao Pham',
    major: 'Sociology',
    year: 'Year 4',
    skills: ['Community Org', 'First Aid'],
    avatar: 'https://placehold.co/80x80',
  },
  {
    id: 4,
    name: 'Quoc Bao Tran',
    major: 'Physical Education',
    year: 'Year 3',
    skills: ['Sports Coach', 'Youth Mentor'],
    avatar: 'https://placehold.co/80x80',
  },
  {
    id: 5,
    name: 'Gia Bao Dang',
    major: 'Agriculture Science',
    year: 'Year 4',
    skills: ['Farming Tech', 'Rural Dev', 'Horticulture'],
    avatar: 'https://placehold.co/80x80',
  },
];

function ApplicantCard({ applicant }: { applicant: Applicant }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_28px_-24px_rgba(15,23,42,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <img className="h-20 w-20 rounded-2xl bg-slate-100 object-cover" src={applicant.avatar} alt={applicant.name} />
        <span className="rounded-full bg-orange-100/50 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#ffa900]">
          Pending
        </span>
      </div>

      <div>
        <h3 className="m-0 text-lg font-bold text-[#151b2a]">{applicant.name}</h3>
        <p className="mt-1 text-[0.92rem] text-slate-500">
          {applicant.major}, {applicant.year}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {applicant.skills.map((skill) => (
          <span key={skill} className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
            {skill}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          className="rounded-xl bg-green-500/10 px-2 py-2.5 text-[0.82rem] font-bold text-green-600 transition hover:brightness-95"
        >
          Accept
        </button>
        <button
          type="button"
          className="rounded-xl bg-red-500/10 px-2 py-2.5 text-[0.82rem] font-bold text-red-600 transition hover:brightness-95"
        >
          Reject Unqualified
        </button>
      </div>
    </article>
  );
}

export default function VolunteerApplication() {
  return (
    <section className="min-h-[calc(100vh-6rem)] w-full px-6">
      <div className="flex w-full flex-col gap-7">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="mt-1 text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-none text-[#151b2a]">
              Volunteer Applications
            </h1>
            <p className="mt-4 max-w-[46rem] text-[1.05rem] leading-[1.65] text-slate-500">
              Reviewing candidates for the <span className="text-indigo-600">Rural Education Bridge</span> project.
              Ensure every student aligns with our mission of high-impact community service.
            </p>
          </div>

          <div className="flex w-full gap-3 md:w-auto">
            <article className="flex min-w-[8.25rem] flex-1 flex-col rounded-2xl bg-[#f2f3ff] px-5 py-4 md:flex-none">
              <strong className="text-[1.85rem] font-black leading-none text-indigo-700">124</strong>
              <span className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-slate-400">
                Total Pending
              </span>
            </article>
            <article className="flex min-w-[8.25rem] flex-1 flex-col rounded-2xl bg-indigo-600 px-5 py-4 md:flex-none">
              <strong className="text-[1.85rem] font-black leading-none text-white">42</strong>
              <span className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-indigo-200">
                Accepted
              </span>
            </article>
          </div>
        </header>

        {/* <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 md:flex-row md:items-center">
          <p>119 more pending</p>
          <span>Review next batch</span>
        </div> */}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      </div>
    </section>
  );
}
