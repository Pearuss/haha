import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function LoginSSOPage() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.session_state && router.query.code) {
      console.log(router.query.code.toString());

      localStorage.setItem('tokenSso', router.query.code.toString());
      router.push('/');
    }
    router.push('/login');
  });
  return <div />;
}
