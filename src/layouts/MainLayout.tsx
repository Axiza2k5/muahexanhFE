import { Outlet } from 'react-router-dom';
import Navbar from '@/layouts/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
