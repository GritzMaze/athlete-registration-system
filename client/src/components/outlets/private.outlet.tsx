
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../context/current-user-context';

function NavigateToLogin() {
    const location = useLocation();
  
    return <Navigate to="/login" state={{ location: location.pathname }} />;
  }

export function PrivateOutlet() {
    const { user } = useCurrentUser();
  
    return user ? (
      <>
        <Outlet />
      </>
    ) : (
      <NavigateToLogin />
    );
  }