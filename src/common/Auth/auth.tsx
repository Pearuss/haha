import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';

function Auth({ children }: any) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      router.push('/login');
    }
  }, [router, profile, firstLoading]);

  if (!profile?.username) return <p>Loading...</p>;

  return <div>{children}</div>;
}
export default Auth;
