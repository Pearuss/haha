import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';

function Auth({ children }: any) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      router.replace('/login');
    }
  }, [router, profile, firstLoading]);

  if (!profile?.username) return <p>Loading...</p>;

  return <div className="bg-white">{children}</div>;
}
export default Auth;
