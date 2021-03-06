/* eslint-disable */
import React, { useState } from 'react';

import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

import ProfileModal from '../dialogEditProfile';

function UserDetail({ data, isOwner, profile, toggleArticles, setToggleArticles }: any) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  // const { profile } = useAuth();

  // const [isOwner, setIsOwner] = useState(false);
  // // const userId = data?.data.userId;
  // useEffect(() => {
  //   if (profile && userId && profile.data?.userId.toString() === userId.toString()) {
  //     setIsOwner(true);
  //   } else {
  //     setIsOwner(false);
  //   }
  // }, [profile, userId]);

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
        {data ? (
          <div className="font-semibold text-xl text-blueCyanLogo pb-2">
            {data?.authorName
              ? `${data?.authorName} - ${data?.firstName} ${data?.lastName}`
              : `${data?.firstName} ${data?.lastName}`}
          </div>
        ) : (
          ''
        )}
        <div className="font-medium text-gray-900">Hybrid Technologies Vietnam</div>
        {data?.slogan ? (
          <div className="flex items-center text-gray-900 pt-2">
            <LocalFireDepartmentOutlinedIcon />
            <span className="pl-4">{data?.slogan}</span>
          </div>
        ) : (
          ''
        )}
        {data?.email ? (
          <div className="flex items-center text-gray-900 pt-2">
            <MailOutlineOutlinedIcon />
            <span className="pl-4">{data?.email}</span>
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center text-gray-900 pt-2">
          <PhoneIphoneOutlinedIcon />
          <span className="pl-4">{data?.tel ? data?.tel : '********'}</span>
        </div>
      </div>
      <div className="w-full flex items-center pt-8 border-b-4 border-blueCyanLogo">
        <div
          className={`flex-1 pb-2 text-center font-semibold cursor-pointer hover:text-blueCyanLogo ${
            toggleArticles ? 'text-blueCyanLogo' : 'text-gray-800'
          }`}
          onClick={() => setToggleArticles(true)}
        >
          Posts
        </div>
        {isOwner && (
          <div
            className={`flex-1 pb-2 text-center font-semibold text-gray-800 cursor-pointer hover:text-blueCyanLogo ${
              toggleArticles ? 'text-gray-800' : 'text-blueCyanLogo'
            }`}
            onClick={() => setToggleArticles(false)}
          >
            Comments
          </div>
        )}
      </div>
      <ProfileModal profile={profile} open={showProfileModal} setOpen={setShowProfileModal} />
    </div>
  );
}

export default UserDetail;
