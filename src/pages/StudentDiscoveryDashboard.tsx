import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Green Schools Initiative',
    location: 'Tra Vinh Province',
    skills: ['Teaching', 'Community'],
    status: 'Approved',
    img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=400&h=220&fit=crop',
  },
  {
    id: '2',
    title: 'Infrastructure Support',
    location: 'Kon Tum Highlands',
    skills: ['Construction', 'Engineering'],
    status: 'Approved',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=220&fit=crop',
  },
  {
    id: '3',
    title: 'Medical Outreach 2024',
    location: 'Ben Tre Delta',
    skills: ['Medical', 'Elderly Care'],
    status: 'Approved',
    img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=220&fit=crop',
  },
  {
    id: '4',
    title: 'Green Schools Initiative',
    location: 'Tra Vinh Province',
    skills: ['Teaching', 'Community'],
    status: 'Approved',
    img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=400&h=220&fit=crop',
  },
  {
    id: '5',
    title: 'Green Schools Initiative',
    location: 'Tra Vinh Province',
    skills: ['Teaching', 'Community'],
    status: 'Approved',
    img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=400&h=220&fit=crop',
  },
  {
    id: '6',
    title: 'Cultural Arts Program',
    location: 'Quang Nam Heritage',
    skills: ['Arts', 'History'],
    status: 'Approved',
    img: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c7?w=400&h=220&fit=crop',
  },
];

const LOCATION_OPTIONS = ['All Locations', 'Tra Vinh Province', 'Kon Tum Highlands', 'Ben Tre Delta', 'Quang Nam Heritage'];
const SKILL_OPTIONS = ['All Skills', 'Teaching', 'Construction', 'Medical', 'Arts', 'Engineering'];

export default function StudentDiscoveryDashboard() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('All Locations');
  const [skill, setSkill] = useState('All Skills');

  const filtered = MOCK_PROJECTS.filter(p => {
    const matchLoc = location === 'All Locations' || p.location === location;
    const matchSkill = skill === 'All Skills' || p.skills.includes(skill);
    return matchLoc && matchSkill;
  });

  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      {/* Header */}
      <h1 className="text-6xl font-extrabold text-darkside tracking-tight leading-none mb-4">
        Explore Missions
      </h1>
      <p className="text-base text-gray-500 max-w-lg mb-10">
        Join thousands of students in the Mua Hè Xanh movement. Filter by your expertise or preferred location to find the mission that resonates with your purpose.
      </p>

      {/* Filters */}
      <div className="flex items-end gap-4 mb-10">
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Location</label>
          <div className="relative">
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-darkside font-medium focus:outline-none focus:ring-2 focus:ring-rocket pr-10 cursor-pointer"
            >
              {LOCATION_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
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

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filtered.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-40 object-cover"
                onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/400/220`; }}
              />
              <span className="absolute top-2 left-2 bg-yoda/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                {project.status}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </p>
              <h3 className="text-lg font-bold text-darkside leading-tight mb-3">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.skills.map(s => (
                  <span key={s} className="text-[11px] font-semibold text-gray-500 border border-gray-200 px-2.5 py-0.5 rounded-full bg-gray-50">
                    {s.toUpperCase()}
                  </span>
                ))}
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
    </div>
  );
}
