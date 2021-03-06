import React from 'react';

import CloseIcon from '@mui/icons-material/Close';

export function ContentIndex() {
  return (
    <div className="fixed top-[12rem] w-[12vw] ssm:w-[70vw] ssm:pl-2 ssm:pt-4 ssm:z-50  ssm:bg-white h-[100vh] ssm:absolute ssm:left-0 ssm:top-0 ssm:border-r ssm:border-gray-300 ssm:shadow-lg">
      <div className="btnCloseTopic hidden absolute top-2 right-2 ssm:block">
        <CloseIcon />
      </div>
      <div className="text-gray-700 ml-[-14px] pb-3 text-2xl font-semibold">Topic</div>
      <div className="flex flex-col topic">
        <ul className="contentIndex w-[90%]" />
      </div>
    </div>
  );
}
