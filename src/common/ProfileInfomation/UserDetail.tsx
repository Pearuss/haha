import React, { useEffect, useState } from 'react';

import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

import { useAuth } from '../../hooks';
import ProfileModal from '../dialogEditProfile';

function UserDetail({ data, userId }: any) {
  const { profile } = useAuth();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  // const userId = data?.data.userId;
  useEffect(() => {
    if (profile && userId && profile.data?.userId.toString() === userId.toString()) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [profile, userId]);

  return (
    <div className="relative w-full h-max bg-gray-100 mb-4 z-0">
      {isOwner && (
        <button
          type="button"
          className="absolute right-8 top-6 py-2 px-4 text-white bg-blueCyanLogo rounded-xl font-medium active:animate-jelly outline-none active:border-none"
          onClick={() => setShowProfileModal(true)}
        >
          Edit Profile
        </button>
      )}

      <div className="pt-[4.4rem] pl-6">
        <div className="font-semibold text-xl text-blueCyanLogo pb-2">
          {data?.data.authorName
            ? `${data.data.authorName} - ${data?.data?.firstName} ${data?.data?.lastName}`
            : `${data?.data?.firstName} ${data?.data?.lastName}`}
        </div>
        <div className="font-medium text-gray-900">Hybrid Technologies Vietnam</div>
        <div className="flex items-center text-gray-900 pt-2">
          <LocalFireDepartmentOutlinedIcon />
          <span className="pl-4">{data?.data.slogan}</span>
        </div>
        <div className="flex items-center text-gray-900 pt-2">
          <MailOutlineOutlinedIcon />
          <span className="pl-4">{data?.data.email}</span>
        </div>
        <div className="flex items-center text-gray-900 pt-2">
          <PhoneIphoneOutlinedIcon />
          <span className="pl-4">{data?.data.tel ? data?.data.tel : '********'}</span>
        </div>
      </div>
      <div className="w-full flex items-center pt-8 border-b-4 border-blueCyanLogo">
        <div className="flex-1 pb-2 text-center font-semibold  text-blueCyanLogo">Posts</div>
        {isOwner && (
          <div className="flex-1 pb-2 text-center font-semibold text-gray-800">Comments</div>
        )}
      </div>
      <ProfileModal profile={profile} open={showProfileModal} setOpen={setShowProfileModal} />
    </div>
  );
}

export default UserDetail;
