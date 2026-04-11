import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import StudentDiscoveryDashboard from '@/pages/StudentDiscoveryDashboard';
import StudentProjectDetail from '@/pages/StudentProjectDetail';
import ApplicationStatusTracker from '@/pages/ApplicationStatusTracker';
import ComingSoon from '@/pages/ComingSoon';
import ProfilePage from '@/pages/ProfilePage';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<StudentDiscoveryDashboard />} />
          <Route path="/projects/:id" element={<StudentProjectDetail />} />
          <Route path="/applications" element={<ApplicationStatusTracker />} />
          <Route path="/messages" element={<ComingSoon />} />
          <Route path="/history" element={<ComingSoon />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
