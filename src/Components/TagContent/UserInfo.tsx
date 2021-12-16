import React from 'react';

function UserInfo() {
  return (
    <div className="info-user">
      <div className="image">
        {/* <Image
      className="w-1/5 rounded-md overflow-hidden"
      src="/static/photo/post2.jpg"
      width="120%"
      height="100%"
      objectFit="fill"
    /> */}
        <textarea className="w-full h-12" />
      </div>
      <div className="block w-full h-56 bg-white">
        <div className="flex-1 ml-4 relative cursor-auto">
          <h2 className="text-lg text-blue-700 font-medium">Nguyen Chi Thong(*_^)</h2>
          <p className="text-base text-gray-800">Hybrid Technologies</p>
          <p className="text-base text-gray-800">
            Skype:
            <a className="ml-3">chithong</a>
          </p>
        </div>
        <div className="block pl-4 relative cursor-auto">
          <p className="flex leading-8 text-base text-gray-800">
            Organization name:
            <p className="text-base text-gray-800 ml-3">Hybrid Technologies</p>
          </p>
          <p className="flex ml-0 leading-8  text-base text-gray-800">
            Department / Division:
            <p className="text-base text-gray-800 ml-3">Internal System</p>
          </p>
          <p className="flex leading-8  text-base text-gray-800">
            E-Mail:
            <a className="ml-3">thongnc@hybrid-technologies.co.jp</a>
          </p>
          <p className="flex leading-8  text-base text-gray-800">
            Mobile:
            <p className="text-base text-gray-800 ml-3">012345678</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
