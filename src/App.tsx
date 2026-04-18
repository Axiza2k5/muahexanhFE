import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import StudentDiscoveryDashboard from '@/pages/StudentDiscoveryDashboard';
import StudentProjectDetail from '@/pages/StudentProjectDetail';
import ApplicationStatusTracker from '@/pages/ApplicationStatusTracker';
import VolunteerApplication from '@/pages/VolunteerApplication';
import ComingSoon from '@/pages/ComingSoon';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
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
          {/* Student Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
            <Route path="/projects" element={<StudentDiscoveryDashboard />} />
            <Route path="/projects/:id" element={<StudentProjectDetail />} />
            <Route path="/applications" element={<VolunteerApplication />} />
            <Route path="/applications/status" element={<ApplicationStatusTracker />} />
          </Route>

          {/* Community Leader Placeholder Routes */}
          <Route element={<ProtectedRoute allowedRoles={['COMMUNITY_LEADER']} />}>
            <Route path="/leader/dashboard" element={<ComingSoon />} />
          </Route>

          {/* Uni Admin Placeholder Routes */}
          <Route element={<ProtectedRoute allowedRoles={['UNI_ADMIN']} />}>
            <Route path="/admin/dashboard" element={<ComingSoon />} />
          </Route>

          {/* Shared Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
