
import { useAuth } from './AuthProvider';
import Link from 'next/link';

const ProtectedLink = ({ href, requiredRoles, children, ...props }) => {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const userRoleIds = roles.map(r => r._id);
    const hasAccess = requiredRoles.some(roleId => userRoleIds.includes(roleId));
    if (!hasAccess) {
      return null;
    }
  }

  return <Link href={href} {...props}>{children}</Link>;
};

export default ProtectedLink;
    