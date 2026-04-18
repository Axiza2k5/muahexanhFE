import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role') as UserRole | null;

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    // Role not authorized, redirect to their respective home page
    if (userRole === 'UNI_ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'COMMUNITY_LEADER') return <Navigate to="/leader/dashboard" replace />;
    if (userRole === 'STUDENT') return <Navigate to="/projects" replace />;
    
    // Fallback if role is unknown
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
