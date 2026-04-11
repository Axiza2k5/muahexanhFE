import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shrink-0 z-20">
      <Link to="/projects" className="font-bold text-xl text-darkside tracking-tight">
        Mua He Xanh
      </Link>
      <nav className="flex items-center gap-8 mx-auto">
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `text-sm font-semibold transition-colors pb-0.5 ${isActive ? 'text-rocket border-b-2 border-rocket' : 'text-gray-500 hover:text-darkside'}`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/applications"
          className={({ isActive }) =>
            `text-sm font-semibold transition-colors pb-0.5 ${isActive ? 'text-rocket border-b-2 border-rocket' : 'text-gray-500 hover:text-darkside'}`
          }
        >
          My Applications
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `text-sm font-semibold transition-colors pb-0.5 ${isActive ? 'text-rocket border-b-2 border-rocket' : 'text-gray-500 hover:text-darkside'}`
          }
        >
          Messages
        </NavLink>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-darkside transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-darkside flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          S
        </div>
      </div>
    </header>
  );
}
