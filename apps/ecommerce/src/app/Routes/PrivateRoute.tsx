import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuthentication } from '../UseAuthentication/UseAuthentication';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authState } = useAuthentication();
  if (authState === 'loggedOut') return <Navigate to="/login" />;
  else return <>{children}</>;
};

export default PrivateRoute;
