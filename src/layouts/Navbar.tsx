import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shrink-0">
      <Link to="/" className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
        <LayoutDashboard size={20} className="text-blue-600" />
        <span>MyApp</span>
      </Link>
      <nav className="ml-auto flex items-center gap-6">
        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
          Home
        </Link>
      </nav>
    </header>
  );
}
