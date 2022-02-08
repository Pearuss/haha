import React, { useEffect } from 'react';

// import Backdrop from '@mui/material/Backdrop';
// import useFetch from '../hooks/use-fetch';
// import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
// import Swal from 'sweetalert2';

export default function LoginSSOPage() {
  // const [open, setOpen] = useState(true);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const router = useRouter();
  const token = router.query.code;
  console.log(token);
  useEffect(() => {
    // Swal.fire('Login successfully but the feature is under maintenance.');
  }, []);

  // useEffect(() => {
  //   const getToken = async () => {
  //     const res = await fetch('/api/sso-login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         code: token,
  //       }),
  //     });
  //     if (res.ok) {
  //       const dataLogin = await res.json();
  //       if (dataLogin.message.toString() === '200') {
  //         router.replace('/');
  //       }
  //     }
  //   };
  //   if (router.query.session_state && token) {
  //     getToken();
  //   }

  //   // console.log(router.query.code);
  // }, [token]);
  return (
    // <Backdrop
    //   sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
    //   open={open}
    //   onClick={handleClose}
    // >
    //   <CircularProgress color="inherit" />
    // </Backdrop>
    <div />
  );
}
