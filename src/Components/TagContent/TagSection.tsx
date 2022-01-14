import React from 'react';

import Calendar from 'react-calendar';
import useSWR from 'swr';
import 'react-calendar/dist/Calendar.css';

import FollowTag from './FollowTag';

function TagSection() {
  const { data: allTag } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`, {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 1000,
  });
  const { data: followTags } = useSWR('/api/v1/following-tag/get-full', {
    // refreshInterval : 4000,
    revalidateOnFocus: true,
    // revalidateIfStale: true,
    // revalidateOnMount: true,
  });

  return (
    <div
      className="sticky 3xl:top-[-330px] 2xl:top-[-21rem] xl:top-[-21rem] lg:top-[-21rem] 3xl:max-w-[26vw] 3xl:min-w-[22vw] 2xl:max-w-[25vw] 2xl:min-w-[21vw] xl:max-w-[21vw]
      lg:max-w-[21vw] h-full max-h-[140vh] text-gray-900 z-30 md:py-4 sm:py-4 ssm:py-4 md:hidden sm:hidden ssm:hidden ml-auto"
    >
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
