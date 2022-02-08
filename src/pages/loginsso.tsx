import React, { useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import useFetch from '../hooks/use-fetch';

export default function LoginSSOPage() {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const token = router.query.code;
  console.log(token);
  useEffect(() => {
    Swal.fire('Login successfully but the feature is under maintenance.');
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const dataLogin = await useFetch('/api/sso-login', {
        method: 'POST',
        body: JSON.stringify({
          code: token,
        }),
      });

      if (dataLogin.message.toString() === '200') {
        router.replace('/');
        console.log('success');
      }
    };
    if (router.query.session_state && token) {
      getToken();
    }

    // console.log(router.query.code);
  }, [token]);
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
