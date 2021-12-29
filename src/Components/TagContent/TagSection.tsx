import React from 'react';

import Calendar from 'react-calendar';
import useSWR from 'swr';
import 'react-calendar/dist/Calendar.css';

import FollowTag from './FollowTag';
// import UserInfo from './UserInfo';

function TagSection() {
  // const { data, error, mutate, inValidating } = useSWR('/tags', { revalidateOnFocus: false });
  const { data: allTag } = useSWR('http://localhost:3100/api/v1/tags', {
    revalidateOnFocus: false,
  });
  const { data } = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });

  return (
    <div
      className="sticky 3xl:top-[10px] 2xl:top-[-80px] xl:top-[-100px] lg:top-[110px] 3xl:max-w-[31vw] 2xl:max-w-[31vw] xl:max-w-[30vw]
      lg:max-w-[30vw] h-full max-h-[140vh] text-gray-900 z-30 overflow-y-visible md:py-4 sm:py-4 ssm:py-4 md:hidden sm:hidden ssm:hidden"
    >
      {/* <UserInfo /> */}
      {/* <Image src="/images/calendar.png" width={700} height={300} priority /> */}
      <Calendar
        className="calendar w-full text-lg rounded-2xl border border-blueCyanLogo"
        onChange={() => {}}
        value={new Date()}
      />
      <FollowTag data={data?.followingTags} titleTagName="Following Tags" />
      <FollowTag data={allTag?.data} titleTagName="Tags Cloud" />
    </div>
  );
}

export default TagSection;
