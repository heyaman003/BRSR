import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem('isLoggedInEmailer') === 'true';

    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
