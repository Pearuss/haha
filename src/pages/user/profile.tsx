import React from 'react';

import { authApi } from '../../api-client';
import { MainLayout } from '../../layout';

function ProfilePage() {
  const logoutHandler = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>Profile</div>
      <button className="py-2 px-3 bg-white rounded-full" type="button" onClick={logoutHandler}>
        logout
      </button>
    </div>
  );
}

ProfilePage.Layout = MainLayout;
export default ProfilePage;
