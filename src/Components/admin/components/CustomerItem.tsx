/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import Link from 'next/link';

import useToggle from '../../../hooks/use-toggle';
import { formatDate } from '../../../utilities/helper';
import DialogSendMessage from '../common/dialogSendMessage';

function CustomerItem(props: any) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const { customer, handleCheckItemClick, setOpenPopup, setUserSelected } = props;

  const [showDialogSendMessage, setShowDialogSendMessage] = useToggle(false);
  return (
    <div className="grid grid-cols-6 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox
            {...label}
            checked={customer.selected}
            onClick={() => handleCheckItemClick(customer)}
          />
        </span>
      </span>
      <Link href={`/user/${customer?.id}`}>
        <span className="ml-[-42%] hover:opacity-50 cursor-pointer">{customer?.email}</span>
      </Link>

      <Link href={`/user/${customer?.id}`}>
        <span className="hover:opacity-50 cursor-pointer">
          {customer?.author_name
            ? customer.author_name
            : `${customer?.first_name} ${customer?.last_name}`}
        </span>
      </Link>

      <span className="ml-6">{customer?.total}</span>
      <span>{formatDate(new Date(customer?.created_at))}</span>
      <span className="flex items-center gap-[24%] mr-2">
        {customer.status ? (
          <Tooltip title="Status">
            <IconButton>
              <Image src="/images/check1.png" alt="check" width={20} height={20} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Status">
            <IconButton>
              <Image src="/images/cross.png" alt="cross" width={20} height={20} />
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
            <Image src="/images/edit.png" alt="edit" width={20} height={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notification">
          <IconButton onClick={setShowDialogSendMessage}>
            <Image src="/images/send-mail.png" alt="send" width={21} height={21} />
          </IconButton>
        </Tooltip>
      </span>
      {showDialogSendMessage && <DialogSendMessage />}
    </div>
  );
}

export default CustomerItem;
