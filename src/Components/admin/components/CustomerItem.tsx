/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import Link from 'next/link';

import useToggle from '../../../hooks/use-toggle';
import { formatDate } from '../../../utilities/helper';
import DialogSendMessage from '../common/dialogSendMessage';

function CustomerItem(props: any) {
  const { customer, setOpenPopup, setUserSelected } = props;

  const [showDialogSendMessage, setShowDialogSendMessage] = useToggle(false);
  return (
    <div className="grid grid-cols-7 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <Link href={`/user/${customer?.id}`}>
        <span className="col-span-2 hover:opacity-50 cursor-pointer">{customer?.email}</span>
      </Link>

      <Link href={`/user/${customer?.id}`}>
        <span className="hover:opacity-50 cursor-pointer">
          {customer.authorName ? customer.authorName : `${customer.firstName} ${customer.lastName}`}
        </span>
      </Link>

      <span className="ml-6">{customer?.total}</span>
      <span>{formatDate(new Date(customer?.createdAt))}</span>
      <span className="flex items-center gap-[24%] mr-2 col-span-2">
        {customer.status ? (
          <Tooltip title="Status">
            <IconButton>
              <Image
                loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
                alt="check"
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Status">
            <IconButton>
              <Image
                loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cross.png`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cross.png`}
                alt="cross"
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setOpenPopup(true);
              setUserSelected(customer);
            }}
          >
            <Image
              loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/edit.png`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/edit.png`}
              alt="edit"
              width={20}
              height={20}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notification">
          <IconButton onClick={setShowDialogSendMessage}>
            <Image
              loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/send-mail.png`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/send-mail.png`}
              alt="send"
              width={21}
              height={21}
            />
          </IconButton>
        </Tooltip>
      </span>
      <DialogSendMessage open={showDialogSendMessage} setOpen={setShowDialogSendMessage} />
    </div>
  );
}

export default CustomerItem;
