import React from 'react';

export function ContentIndex() {
  return (
    <div className="fixed top-[15rem] w-[12vw] h-[100vh]">
      <div className="text-gray-700 pb-3 text-2xl font-semibold">Topic</div>
      <div className="flex flex-col ">
        <ul className="contentIndex w-full"></ul>
      </div>
    </div>
  );
}
