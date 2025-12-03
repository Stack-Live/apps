
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, { requiredRoles } = {}) => {
  const Wrapper = (props) => {
    const { isAuthenticated, loading, user, roles } = useAuth();
    const router = useRouter();
    
    // Check for preview mode only when router is ready
    const isPreview = router.isReady && router.query.preview_mode === 'true';

    useEffect(() => {
      if (loading || !router.isReady || isPreview) {
        return;
      }

      if (!isAuthenticated) {
        router.push('/login');
        return;
      }
      
      const onboardingEnabled = false;
      if (onboardingEnabled && !user.onboardingCompletedAt && !router.pathname.startsWith('/onboarding')) {
        router.push('/onboarding/step-1');
      }

      if (requiredRoles && requiredRoles.length > 0) {
        if (user && user.role === 'Platform Owner') {
          return;
        }
        const userRoleIds = roles.map(r => r._id);
        const hasPermission = requiredRoles.some(roleId => userRoleIds.includes(roleId));
        if (!hasPermission) {
          router.push('/access-denied');
        }
      }

    }, [isAuthenticated, loading, user, roles, router, isPreview]);

    if (isPreview) {
      return <WrappedComponent {...props} />;
    }

    if (loading || !isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading session...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
  return Wrapper;
};

export default withAuth;
    