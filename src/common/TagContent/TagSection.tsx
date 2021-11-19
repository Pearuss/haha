import React from 'react';

import Image from 'next/image';
import useSWR from 'swr';

import FollowTag from './FollowTag';
// import UserInfo from './UserInfo';

function TagSection() {
  // const { data, error, mutate, inValidating } = useSWR('/tags', { revalidateOnFocus: false });
  const { data } = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });

  return (
    <div className="sticky 2xl:top-[40px]  xl:top-[-60px]  2xl:max-w-[35vw] xl:max-w-[25vw] h-full max-h-[140vh] text-gray-700 z-30 mt-5 overflow-y-visible">
      {/* <UserInfo /> */}
      <Image src="/images/calendar.png" width={700} height={300} priority />
      <FollowTag data={data?.followingTags} titleTagName="Following Tags" />
      <FollowTag data={data?.tagsCloud} titleTagName="Tags Cloud" />
    </div>
  );
}

export default TagSection;
