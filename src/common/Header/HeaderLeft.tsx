import React, { ReactElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';

function HeaderLeft(): ReactElement {
  return (
    <div className="relative flex items-center cursor-pointer pt-4 ml-[-2rem] max-w-[250px] w-[250px] md:h-[38px] md:mt-1 h-[45px] max-h-[45px]">
      <Link href="/">
        <Image src="/logo.svg" layout="fill" priority />
      </Link>
    </div>
  );
}

export default HeaderLeft;
