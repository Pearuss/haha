import React from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';
import { AdminLayout } from '../../layout';

function ProfilePage() {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const logoutHandler = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>{JSON.stringify(profile)}</div>
      <button className="py-2 px-3 bg-white rounded-full" type="button" onClick={logoutHandler}>
        logout
      </button>
    </div>
  );
}

ProfilePage.Layout = AdminLayout;
export default ProfilePage;
