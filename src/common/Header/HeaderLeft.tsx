import React, { ReactElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';

function HeaderLeft(): ReactElement {
  return (
    <div className="flex items-center cursor-pointer py-2 ml-[-2rem]">
      <Link href="/">
        <Image src="/logo.svg" width={250} height={40} priority />
      </Link>
    </div>
  );
}

export default HeaderLeft;
