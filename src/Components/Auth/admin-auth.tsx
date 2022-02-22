import React, { useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';

function AdminAuth({ children }: any) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if ((!firstLoading && !profile?.data) || profile?.data?.role !== 40) {
      router.replace('/login');
    }
  }, [router, profile, firstLoading]);

  if (!profile?.data) {
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
