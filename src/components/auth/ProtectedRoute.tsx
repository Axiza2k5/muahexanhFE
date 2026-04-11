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
    // Role not authorized
    return <Navigate to="/projects" replace />;
  }

  return <Outlet />;
}
