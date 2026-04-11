import { useNavigate } from 'react-router-dom';

const MISSION = {
  id: '1',
  code: 'MHX-2024-VN',
  title: 'Clean Water & Sanitation\nFor Rural Soc Trang',
  status: 'Approved',
  campaign: 'Summer Campaign 2024',
  campaignSub: 'Soc Trang Province, Mekong Delta',
  img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&h=400&fit=crop',
  duration: '25 June - 20 July (25 Days)',
  location: 'Vinh Chau, Soc Trang',
  availability: '12 Slots Remaining',
  points: '50 Social Credit Units',
  deadline: 'June 10, 2024',
  overview: `This mission focuses on improving health outcomes for local communities in the Vinh Chau district by constructing sustainable water filtration systems and upgrading sanitation facilities for three primary schools. As a student volunteer, you will be at the heart of this transformation.\n\nBeyond construction, the project involves educational workshops for children on personal hygiene and environmental conservation. You will live with local families, experiencing the rich culture of the Khmer community while making a tangible difference.`,
  objectives: [
    {
      icon: '〜',
      title: 'Water Systems',
      desc: 'Install 5 large-scale bio-sand filtration units providing potable water to over 1,200 residents.',
    },
    {
      icon: '🎓',
      title: 'School Renovation',
      desc: 'Modernize 12 latrines and handwashing stations across local educational centers.',
    },
  ],
  skills: ['Civil Engineering', 'First Aid Certified', 'Khmer Language (Bonus)', 'Community Leadership'],
  applied: 27,
};

export default function StudentProjectDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white">
      {/* Top strip */}
      <div className="px-8 pt-8 pb-0 flex items-center gap-4 max-w-7xl mx-auto">
        <button onClick={() => navigate('/projects')} className="text-gray-400 hover:text-darkside transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="bg-yoda/10 text-yoda text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Approved</span>
        <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">Mission Code: {MISSION.code}</span>
      </div>

      <div className="px-8 grid grid-cols-[1fr_280px] gap-10 pt-5 pb-16 max-w-7xl mx-auto">
        {/* Left content */}
        <div>
          <h1 className="text-5xl font-extrabold text-darkside tracking-tight leading-tight whitespace-pre-line mb-6">
            {MISSION.title}
          </h1>

          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-72">
            <img
              src={MISSION.img}
              alt={MISSION.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <p className="text-white font-bold text-sm">{MISSION.campaign}</p>
              <p className="text-gray-300 text-xs uppercase tracking-wider">{MISSION.campaignSub}</p>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-darkside mb-4">Mission Overview</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">{MISSION.overview}</p>
          </section>

          {/* Objectives */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-darkside mb-4">Mission Objectives</h2>
            <div className="grid grid-cols-2 gap-4">
              {MISSION.objectives.map(obj => (
                <div key={obj.title} className="bg-gray-50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-rocket text-lg mb-3">
                    {obj.icon}
                  </div>
                  <h4 className="font-bold text-darkside mb-1">{obj.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{obj.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-darkside mb-4">Who We're Looking For</h2>
            <div className="flex flex-wrap gap-2">
              {MISSION.skills.map(s => (
                <span key={s} className="flex items-center gap-2 bg-indigo-50 text-rocket font-medium text-sm px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-rocket inline-block"></span>
                  {s}
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
                  src={`https://i.pravatar.cc/40?img=${i + 10}`}
                  className="w-9 h-9 rounded-full border-2 border-white"
                  alt="volunteer"
                />
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-white bg-rocket flex items-center justify-center text-white text-xs font-bold">
                +{MISSION.applied - 3}
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-darkside text-base">Join {MISSION.applied} other students already applied</p>
              <p className="text-sm text-gray-500">A community of builders, educators, and leaders waiting for you.</p>
            </div>
            <button className="text-rocket font-bold text-sm hover:underline flex items-center gap-1">
              See project updates
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 pt-2">
          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <button className="flex-1 bg-rocket text-white font-bold py-3 rounded-xl text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              Apply for Mission
            </button>
            <button className="w-11 h-11 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-rocket hover:border-rocket transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>

          {/* Mission data card */}
          <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mission Data</p>
            {[
              { icon: '📅', label: 'Duration', value: MISSION.duration },
              { icon: '📍', label: 'Location', value: MISSION.location },
              { icon: '👥', label: 'Availability', value: MISSION.availability },
              { icon: '⭐', label: 'Points', value: MISSION.points },
            ].map(row => (
              <div key={row.label} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-base shrink-0">
                  {row.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{row.label}</p>
                  <p className="text-sm font-bold text-darkside">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Apply Now */}
          <button className="w-full bg-rocket text-white font-bold py-4 rounded-xl text-base hover:bg-indigo-700 transition-colors">
            Apply Now
          </button>
          <p className="text-center text-xs text-gray-400 font-medium">Deadline: {MISSION.deadline}</p>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden h-36 bg-gradient-to-br from-blue-400 to-blue-600 relative flex items-end p-3">
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/105.97,9.6,6/280,144@2x?access_token=fallback')", backgroundSize: 'cover' }}></div>
            <div className="relative z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold text-darkside w-full justify-center">
              <svg className="w-4 h-4 text-rocket" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              View Location Details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
