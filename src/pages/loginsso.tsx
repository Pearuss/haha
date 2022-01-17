import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function LoginSSOPage() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.session_state && router.query.code) {
      localStorage.setItem('tokenSso', router.query.code.toString());
      router.push('/');
    }
    router.push('/login');
  });
  return <div />;
}
