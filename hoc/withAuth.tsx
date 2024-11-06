import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ComponentType } from 'react';

const withAuth = (WrappedComponent: ComponentType) => {
  const WithAuthComponent = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const user = Cookies.get('user');
      if (!user) {
        router.replace('/auth/signin');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;