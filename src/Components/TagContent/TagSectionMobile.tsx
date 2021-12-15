import React from 'react';

import Calendar from 'react-calendar';
import useSWR from 'swr';
import 'react-calendar/dist/Calendar.css';

import FollowTag from './FollowTag';
// import UserInfo from './UserInfo';

function TagSectionobile({ isShowTagMobile }: any) {
  // const { data, error, mutate, inValidating } = useSWR('/tags', { revalidateOnFocus: false });
  const { data } = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });

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
        <FollowTag data={data?.followingTags} titleTagName="Following Tags" />
        <FollowTag data={data?.tagsCloud} titleTagName="Tags Cloud" />
      </div>
    </div>
  );
}

export default TagSectionobile;
