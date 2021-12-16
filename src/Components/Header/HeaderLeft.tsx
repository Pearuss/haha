/* eslint-disable max-len */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

function HeaderLeft() {
  return (
    <div className="relative flex items-center cursor-pointer pt-4 ml-[-2rem] max-w-[250px] w-[250px] md:h-[38px] md:mt-1 sm:mt-[5px] sm:h-[35px] sm:ml-[-4rem] ssm:h-[32px] ssm:ml-[-5rem] h-[45px] max-h-[45px]">
      <Link href="/">
        <Image src="/logo.svg" layout="fill" priority />
      </Link>
      {/* <Link href="/">
        <Image src="/images/favicon-32x32.png" layout="fill" priority className="ssm:block hidden" />
      </Link> */}
    </div>
  );
}

export default HeaderLeft;
