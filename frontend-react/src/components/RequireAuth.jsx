import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const userRole = localStorage.getItem('role') || 'manager'; // Default to manager if missing

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Redirect unauthorized users
        return <Navigate to={userRole === 'manager' ? '/manager' : '/superadmin'} replace />;
    }

    return children;
};

export default RequireAuth;
