import React, { useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

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

  // useEffect(() => {
  //   const getToken = async () => {
  //     const formElement: any = {
  //       code: router.query.code,
  //       client_id: 'hybrid',
  //       grant_type: 'authorization_code',
  //       redirect_uri: 'http://localhost:9500/loginsso',
  //     };

  //     let formBody: any = [];
  //     for (let property in formElement) {
  //       const encodedKey: any = encodeURIComponent(property);
  //       const encodedValue: any = encodeURIComponent(formElement[property]);
  //       formBody.push(encodedKey + '=' + encodedValue);
  //     }
  //     formBody = formBody.join('&');
  //     const res = await fetch(
  //       'http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //         body: formBody,
  //       }
  //     );
  //     console.log(res);

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data.access_token);

  //       const resData = await fetch('/api/sso-login', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           token: data.access_token,
  //         }),
  //       });
  //       if (resData.ok) {
  //         const dataLogin = await resData.json();
  //         if (dataLogin.message.toString() === '200') {
  //           router.replace('/');
  //         }
  //       }
  //     }
  //   };
  //   if (router.query.session_state && token) {
  //     getToken();
  //   }

  //   // console.log(router.query.code);
  // }, [token]);
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
