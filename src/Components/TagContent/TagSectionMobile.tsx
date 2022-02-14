import React, { useEffect, useState } from 'react';
// import React from 'react';

import Calendar from 'react-calendar';
import useSWR from 'swr';
import 'react-calendar/dist/Calendar.css';

import FollowTag from './FollowTag';
import { useAuth } from '../../hooks';

function TagSectionMobile({ isShowTagMobile }: any) {
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
    <div
      className={`hidden p-3 z-50 overflow-scroll md:block sm:block ssm:block fixed h-[100vh] w-[35vw] top-0 right-0 bg-white transition duration-200 ease-in-out md:w-[40vw] sm:w-[50vw] ssm:w-[70vw] transform ${
        !isShowTagMobile ? 'translate-x-full' : ''
      }`}
    >
      <div className="sticky 3xl:top-[10px] 2xl:top-[-80px] xl:top-[-100px] lg:top-[110px] 3xl:max-w-[34vw] 2xl:max-w-[32vw] xl:max-w-[30vw] lg:max-w-[26vw] h-full max-h-[140vh] text-gray-700 z-30 overflow-y-visible md:py-4 sm:py-4 ssm:py-4">
        {/* <UserInfo /> */}
        {/* <Image src="/images/calendar.png" width={700} height={300} priority /> */}
        <Calendar
          className="calendar w-full text-lg rounded-2xl border border-gray-300"
          onChange={() => {}}
          value={new Date()}
        />
        <FollowTag data={followTags?.data} titleTagName="Following Tags" />
        <FollowTag data={allTag?.data} titleTagName="Tags Cloud" />
      </div>
    </div>
  );
}

export default TagSectionMobile;
