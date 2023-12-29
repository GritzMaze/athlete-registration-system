import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../context/current-user-context';


export function NavigateToHome() {
    return <Navigate to="/" />;
  }
  
  export function PublicOutlet() {
    const { user } = useCurrentUser();
  
    return user ? <NavigateToHome /> : <Outlet />;
  }
  