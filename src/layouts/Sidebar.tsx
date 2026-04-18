import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserRole } from '@/types';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  allowedRoles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  // Student Items
  {
    label: 'Projects',
    to: '/projects',
    allowedRoles: ['STUDENT'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    label: 'My Applications',
    to: '/applications',
    allowedRoles: ['STUDENT'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  // Community Leader Items
  {
    label: 'Mission Board',
    to: '/leader/dashboard',
    allowedRoles: ['COMMUNITY_LEADER'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: 'Create Project',
    to: '/createproject',
    allowedRoles: ['COMMUNITY_LEADER'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  // Uni Admin Items
  {
    label: 'Admin Panel',
    to: '/admin/dashboard',
    allowedRoles: ['UNI_ADMIN'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'Register Leader',
    to: '/admin/register-leader',
    allowedRoles: ['UNI_ADMIN'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  // Shared Items
  {
    label: 'Profile',
    to: '/profile',
    allowedRoles: ['STUDENT'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const userRole = (localStorage.getItem('role') || 'STUDENT') as UserRole;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const filteredItems = NAV_ITEMS.filter(item => item.allowedRoles.includes(userRole));

  return (
    <aside className="w-64 shrink-0 flex flex-col bg-white border-r border-gray-100 min-h-full py-6 px-4">
      {/* Brand */}
      <div className="mb-10 px-4">
        <h1 className="font-extrabold text-2xl text-darkside tracking-tighter">
          Mua He Xanh
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {filteredItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/projects'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                ? 'bg-indigo-50 text-rocket'
                : 'text-gray-500 hover:bg-gray-50 hover:text-darkside'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all transition-colors mt-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log out
        </button>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-6 pt-6 border-t border-gray-50 px-2">
        {/* User Profile */}
        <div className="flex items-center gap-3 py-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-darkside flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-sm cursor-pointer">
              {userRole.charAt(0)}
            </div>
            <div className="absolute -top-1 -right-1">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rocket opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rocket border-2 border-white"></span>
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-darkside truncate text-ellipsis overflow-hidden capitalize">{userRole.toLowerCase().replace('_', ' ')}</p>
            <p className="text-[11px] text-gray-400 font-medium truncate">Mua He Xanh User</p>
          </div>
          <button className="text-gray-400 hover:text-darkside transition-colors p-1.5 hover:bg-gray-50 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
