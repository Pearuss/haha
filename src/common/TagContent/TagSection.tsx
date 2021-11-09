import React from 'react';

import useSWR from 'swr';

import FollowTag from './FollowTag';
import UserInfo from './UserInfo';

function TagSection() {
  // const { data, error, mutate, inValidating } = useSWR('/tags', { revalidateOnFocus: false });
  const { data } = useSWR('/tags', { revalidateOnFocus: false });

  return (
    <div className="sticky top-[152px] max-w-[35vw] h-[100vh] max-h-[140vh] z-30 mt-4 overflow-y-hidden">
      <UserInfo />
      <FollowTag data={data?.followingTags} />
      <FollowTag data={data?.tagsCloud} />
    </div>
  );
}

export default TagSection;
