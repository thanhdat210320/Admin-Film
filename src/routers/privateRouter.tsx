import { useAuth } from '@/contexts/auth';
import ErrorPage from '@/pages/ErrorPage';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingCricle from '@/components/Loading/loadingCricle'

const PrivateRouter = ({ permission, permissionNew, children }: { permission?: string, permissionNew?: string, children: JSX.Element }) => {
  const { isAuthenticated, user } = useAuth()
  let permissions = user?.role?.permissions;
  const isHasPermission = !!permissionNew ? permissions?.filter((item: any) => (item.key === permission || item.key === permissionNew)) : permissions?.filter((item: any) => item.key === permission);
  const location = useLocation()
  if (!isAuthenticated && typeof isAuthenticated === 'boolean') {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />
  }
  if (!isAuthenticated && typeof isAuthenticated === 'undefined') {
    return <LoadingCricle />
  }
  if (location.pathname == '/') {
    return children
  }
  if (isHasPermission?.length === 0) {
    return <ErrorPage />
  }
  return children
};

export default PrivateRouter;
