import React from 'react';

import useSWR from 'swr';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import FollowTag from './FollowTag';
// import UserInfo from './UserInfo';

function TagSection() {
  // const { data, error, mutate, inValidating } = useSWR('/tags', { revalidateOnFocus: false });
  const { data } = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });

  return (
    <div
      className="sticky 3xl:top-[10px] 2xl:top-[-80px] xl:top-[-100px] lg:top-[110px] 3xl:max-w-[33vw] 2xl:max-w-[32vw] xl:max-w-[30vw]
      h-full max-h-[140vh] text-gray-700 z-30 overflow-y-visible md:py-4 sm:py-4 ssm:py-4 md:hidden sm:hidden ssm:hidden"
    >
      {/* <UserInfo /> */}
      {/* <Image src="/images/calendar.png" width={700} height={300} priority /> */}
      <Calendar
        className="w-full text-lg rounded-2xl border border-gray-300"
        onChange={() => {}}
        value={new Date()}
      />
      <FollowTag data={data?.followingTags} titleTagName="Following Tags" />
      <FollowTag data={data?.tagsCloud} titleTagName="Tags Cloud" />
    </div>
  );
}

export default TagSection;
