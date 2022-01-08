import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-gray-700 bg-opacity-40 z-50">
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
}
