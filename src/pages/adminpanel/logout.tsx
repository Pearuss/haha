/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
import React, { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';
// import Swal from 'sweetalert2';

export default function Index() {
  const { logout } = useAuth();
  const router = useRouter();

  const logoutHandler = useCallback(async () => {
    try {
      await logout();
      router.push('/login');
      //   if (router.pathname === '/') {
      //     Swal.fire('Logout success!');
      //   }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    logoutHandler();
  }),
  [];
  return <div />;
}
