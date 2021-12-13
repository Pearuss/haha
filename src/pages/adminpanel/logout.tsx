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
      localStorage.removeItem('isView');
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
