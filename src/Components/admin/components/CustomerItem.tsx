import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DialogSendMessage from '../common/dialogSendMessage';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useToggle from '../../../hooks/use-toggle';

function CustomerItem(props: any): ReactElement {
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
      <span className="ml-[-42%]">{customer.email}</span>
      <span>{customer.name}</span>
      <span>{customer.phone}</span>
      <span>{customer.createAt}</span>
      <span className="flex items-center gap-[24%] mr-2">
        {customer.status ? (
          <Tooltip title="Status">
            <IconButton>
              <Image src="/images/check1.png" width={20} height={20} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Status">
            <IconButton>
              <Image src="/images/cross.png" width={20} height={20} />
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
            <Image src="/images/edit.png" width={20} height={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notification">
          <IconButton onClick={setShowDialogSendMessage}>
            <Image src="/images/send-mail.png" width={21} height={21} />
          </IconButton>
        </Tooltip>
      </span>
      {showDialogSendMessage && <DialogSendMessage />}
    </div>
  );
}

export default CustomerItem;
