import { useNavigate } from 'react-router-dom';

type AppStatus = 'IN_PROGRESS' | 'APPROVED' | 'NOT_SELECTED';

const APPLICATIONS = [
  {
    id: 'APP-001',
    title: 'Eco-Warrior: Coastal Cleanup',
    appliedDate: 'Oct 12, 2023',
    status: 'IN_PROGRESS' as AppStatus,
    steps: [
      { label: 'Submitted', date: 'Oct 12', done: true, current: false },
      { label: 'Admin Verified', date: 'Oct 14', done: true, current: false },
      { label: 'Leader Reviewing', date: 'Current Stage', done: false, current: true },
      { label: 'Final Decision', date: 'Pending', done: false, current: false },
    ],
    note: null,
  },
  {
    id: 'APP-002',
    title: 'Urban Literacy Workshop',
    appliedDate: 'Sept 28, 2023',
    status: 'APPROVED' as AppStatus,
    steps: [
      { label: 'Submitted', date: '', done: true, current: false },
      { label: 'Verified', date: '', done: true, current: false },
      { label: 'Reviewed', date: '', done: true, current: false },
      { label: 'Approved', date: '', done: true, current: false },
    ],
    note: null,
  },
  {
    id: 'APP-003',
    title: 'Tech for Seniors Program',
    appliedDate: 'Aug 15, 2023',
    status: 'NOT_SELECTED' as AppStatus,
    steps: [
      { label: 'Submitted', date: '', done: true, current: false },
      { label: 'Rejected', date: '', done: false, current: false, rejected: true },
      { label: 'N/A', date: '', done: false, current: false },
      { label: 'Final Decision', date: '', done: false, current: false },
    ],
    note: "Capacity for this project has been reached. We've saved your profile for future workshops.",
  },
];

const STATUS_META: Record<AppStatus, { label: string; color: string }> = {
  IN_PROGRESS: { label: 'In Progress', color: 'bg-chewie/10 text-chewie' },
  APPROVED: { label: 'Mission Approved', color: 'bg-yoda/10 text-yoda' },
  NOT_SELECTED: { label: 'Not Selected', color: 'bg-maul/10 text-maul' },
};

function StepDot({ done, current, rejected }: { done: boolean; current?: boolean; rejected?: boolean }) {
  if (rejected) {
    return (
      <div className="w-9 h-9 rounded-full border-2 border-maul bg-white flex items-center justify-center">
        <svg className="w-5 h-5 text-maul" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
  if (current) {
    return (
      <div className="w-9 h-9 rounded-full border-2 border-chewie bg-white flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-chewie animate-pulse"></div>
      </div>
    );
  }
  if (done) {
    return (
      <div className="w-9 h-9 rounded-full bg-yoda flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
      <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    </div>
  );
}

export default function ApplicationStatusTracker() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white">
      <div className="px-8 pt-8 max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Student Dashboard</p>
        <h1 className="text-6xl font-extrabold text-darkside tracking-tight mb-4">Application Tracking</h1>
        <p className="text-base text-gray-500 mb-10 max-w-lg">
          Monitor your journey toward impact. Every mission starts with a single step, and here is where your story unfolds.
        </p>

        {/* Application cards */}
        <div className="space-y-4 mb-10">
          {APPLICATIONS.map(app => {
            const meta = STATUS_META[app.status];
            const isApproved = app.status === 'APPROVED';
            const isRejected = app.status === 'NOT_SELECTED';

            return (
              <div key={app.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
                  {/* Left */}
                  <div>
                    <span className={`inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${meta.color}`}>
                      {meta.label}
                    </span>
                    <h3 className="text-2xl font-bold text-darkside leading-tight mb-1">{app.title}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-4">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Applied: {app.appliedDate}
                    </p>
                    {isApproved && (
                      <button className="bg-yoda/10 text-yoda font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-yoda hover:text-white transition-colors">
                        Get Mission Pack
                      </button>
                    )}
                    {!isApproved && !isRejected && (
                      <button
                        onClick={() => navigate('/projects/1')}
                        className="text-rocket font-bold text-sm flex items-center gap-1 hover:underline"
                      >
                        View Details
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    )}
                    {app.note && (
                      <div className="mt-4 bg-maul/5 border-l-4 border-maul rounded-r-xl p-3 max-w-xs">
                        <p className="text-sm text-maul font-medium leading-relaxed">{app.note}</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Progress Steps */}
                  <div className="flex flex-col items-end pt-2">
                    <div className="flex items-center">
                      {app.steps.map((step, i) => (
                        <div key={step.label} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <StepDot done={step.done} current={step.current} rejected={(step as any).rejected} />
                            <p className={`text-[11px] font-bold mt-1.5 text-center ${step.current ? 'text-chewie' : (step as any).rejected ? 'text-maul' : step.done ? 'text-yoda' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                            <p className="text-[10px] text-gray-400 text-center">{step.date}</p>
                          </div>
                          {i < app.steps.length - 1 && (
                            <div className={`w-12 h-0.5 mx-1 mb-6 ${step.done && !step.current ? 'bg-yoda' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-[1fr_260px] gap-4">
          {/* Impact summary */}
          <div className="bg-rocket rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Summer Impact Summary</h3>
            <p className="text-white/70 text-sm mb-6">
              You've applied for 3 missions so far. Your contribution helps over 500 community members in rural districts.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-4xl font-black">12</p>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mt-1">Days Active</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-4xl font-black">85%</p>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mt-1">Approval Rate</p>
              </div>
            </div>
          </div>

          {/* Next step */}
          <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col">
            <div className="w-10 h-10 bg-rocket/10 rounded-xl flex items-center justify-center text-rocket text-xl mb-4">💡</div>
            <h4 className="font-bold text-darkside text-base mb-2">Next Step</h4>
            <p className="text-sm text-gray-500 flex-1">
              Your application for "Coastal Cleanup" is with the Team Leader. Expect a response within 48 hours.
            </p>
            <button className="mt-4 text-rocket font-bold text-sm flex items-center gap-1 hover:underline">
              Preparation Guide
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* FAB
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-rocket text-white rounded-full shadow-lg text-2xl flex items-center justify-center hover:bg-indigo-700 transition-colors z-50">
        +
      </button> */}
    </div>
  );
}
