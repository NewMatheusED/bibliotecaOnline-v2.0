import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  if (!user) {
    return null; // TODO: trocar por um componente de loading
  }

  return <>{children}</>;
};

export default ProtectedRoute;