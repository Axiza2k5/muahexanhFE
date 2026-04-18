import { Outlet } from 'react-router-dom';
import Sidebar from '@/layouts/Sidebar';

export default function MainLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-white font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
