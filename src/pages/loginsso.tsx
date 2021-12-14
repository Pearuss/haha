import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function LoginSSOPage() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query);
    // router.push('/');
  });
  return <div />;
}
