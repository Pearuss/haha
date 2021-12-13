import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';
import { Backdrop, CircularProgress } from '@mui/material';

function Auth({ children }: any) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      router.replace('/login');
    }
  }, [router, profile, firstLoading]);

  if (!profile?.username)
    return (
      <p>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </p>
    );

  return <div className="bg-white">{children}</div>;
}
export default Auth;
