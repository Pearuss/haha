import React, { ReactElement } from 'react';

import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

function UserDetail({ data }: any): ReactElement {
  return (
    <div className="relative w-full h-max bg-white mb-4 ">
      <button
        type="button"
        className="absolute right-8 top-4 py-2 px-4 text-white bg-blue-300 rounded-full font-medium active:animate-jelly outline-none active:border-none"
      >
        Edit Profile
      </button>
      <div className="mt-[4.4rem] pl-6">
        <div className="font-semibold text-xl text-blue-400 pb-2">Le Huynh Duc - Fresher</div>
        <div className="font-medium text-gray-700">Hybrid Technologies Vietnam</div>
        <div className="flex items-center text-gray-700 pt-2">
          <LocalFireDepartmentOutlinedIcon />
          <span className="pl-4">HAN Fresher Training</span>
        </div>
        <div className="flex items-center text-gray-700 pt-2">
          <MailOutlineOutlinedIcon />
          <span className="pl-4">{data?.username}</span>
        </div>
        <div className="flex items-center text-gray-700 pt-2">
          <PhoneIphoneOutlinedIcon />
          <span className="pl-4">0989275134</span>
        </div>
      </div>
      <div className="w-full flex items-center pt-8 border-b-4 border-blue-300">
        <div className="flex-1 pb-2 text-center font-semibold  text-blue-500">Posts</div>
        <div className="flex-1 pb-2 text-center font-semibold text-gray-800">Comments</div>
      </div>
    </div>
  );
}

export default UserDetail;
