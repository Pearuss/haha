import React, { useEffect, useState } from 'react';
// import React from 'react';

import Calendar from 'react-calendar';
import useSWR from 'swr';
import 'react-calendar/dist/Calendar.css';

import FollowTag from './FollowTag';
import { useAuth } from '../../hooks/use-auth';

function TagSection() {
  const { profile, firstLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!firstLoading && !profile?.data) {
      setIsLogin(false);
    } else if (profile?.data) {
      setIsLogin(true);
    }
  }, [profile, firstLoading]);

  const { data: allTag } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`, {
    revalidateOnFocus: false,
    // dedupingInterval: 60 * 1000,
  });

  let { data: followTags } = useSWR(isLogin ? '/api/v1/following-tag/get-full' : null, {
    // refreshInterval : 4000,
    revalidateOnFocus: true,
    // revalidateIfStale: true,
    // revalidateOnMount: true,
  });
  if (!followTags) {
    followTags = [];
  }

  return (
    <div className="sticky 3xl:top-[-330px] 2xl:top-[-38rem] xl:top-[-38rem] lg:top-[-38rem] 3xl:max-w-[26vw] 3xl:min-w-[22vw] 2xl:max-w-[27vw] 2xl:min-w-[27vw] xl:max-w-[28vw] lg:max-w-[28vw] lg:min-w-[20vw] h-full text-gray-900 z-30 md:py-4 sm:py-4 ssm:py-4 md:hidden sm:hidden ssm:hidden ml-auto">
      <Calendar
        className="calendar w-full text-lg rounded-2xl border border-blueCyanLogo"
        onChange={() => {}}
        value={new Date()}
      />

      <FollowTag data={followTags?.data} titleTagName="Following Tags" />
      <FollowTag data={allTag?.data} titleTagName="Tags Cloud" />
    </div>
  );
}

export default TagSection;
