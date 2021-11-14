import React from 'react';

import Image from 'next/image';
import useSWR from 'swr';

import FollowTag from './FollowTag';
// import UserInfo from './UserInfo';

function TagSection() {
  // const { data, error, mutate, inValidating } = useSWR('/tags', { revalidateOnFocus: false });
  const { data } = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });

  return (
    <div className="sticky top-[152px] max-w-[35vw] h-[100vh] max-h-[140vh] text-gray-700 z-30 mt-4 overflow-y-hidden">
      {/* <UserInfo /> */}
      <Image src="/images/calendar.png" width={700} height={300} priority />
      <FollowTag data={data?.followingTags} />
      <FollowTag data={data?.tagsCloud} />
    </div>
  );
}

export default TagSection;
