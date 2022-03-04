import React, { useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';

function AdminAuth({ children }: any) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  const [open, setOpen] = React.useState(true);
  const role = profile?.data?.role;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!firstLoading && role < 25) {
      router.replace('/login');
    }
  }, [router, role, firstLoading]);

  if (!profile?.data?.role) {
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

  return <div className="bg-white">{children}</div>;
}
export default AdminAuth;
