import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
import DialogDelete from '../../Components/admin/common/dialogDelete';
import MemberItem from '../../Components/admin/components/MemberItem';
import DeleteIcon from '@mui/icons-material/Delete';

function Cpanel(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const memberFake = [
    {
      id: '1',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'Diem',
      authorization: 'Admin',
      createAt: '25/08/200 08:25',
      status: 'active',
      selected: false,
    },
    {
      id: '2',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'Diem',
      authorization: 'Admin',
      createAt: '25/08/200 08:25',
      status: 'active',
      selected: false,
    },
    {
      id: '3',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'ReactJS',
      authorization: 'Admin',
      createAt: '25/08/200 08:25',
      status: 'active',
      selected: false,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataMembers, setDataMembers] = useState(memberFake);

  const hasSelectedMember = useMemo(() => {
    return dataMembers.find((member) => member.selected === true);
  }, [dataMembers]);

  useEffect(() => {
    const isSelectedAll = dataMembers.find((member) => member.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataMembers]);

  const handleSelectAllClick = () => {
    const newDataMembers = [...dataMembers].map((member) => ({ ...member, selected: !selectAll }));
    setSelectAll(!selectAll);
    setDataMembers(newDataMembers);
  };

  const handleDeleteClick = () => {
    const dataSelected = dataMembers.filter((member) => member.selected === true);
    console.log(dataSelected);
    handleClose();
  };

  const handleCheckItemClick = (member: any) => {
    const index = dataMembers.indexOf(member);
    const newDataMembers = [...dataMembers];
    newDataMembers.splice(index, 1, { ...member, selected: !member.selected });
    setDataMembers(newDataMembers);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <LayoutAdminPage title="Member">
      <HeaderAdmin
        titlePage="Administrator"
        subTitlePage="List of administrators"
        searchPlaceholder="Admin email..."
      />

      <div className="bg-white rounded h-full p-4 px-6 min-w-[1167px]">
        <div className="flex justify-between pb-4 mb-4 border-b-2 border-gray-600">
          <h4 className="">Admin list</h4>
          <button
            disabled={typeof hasSelectedMember === 'undefined' ? true : false}
            className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer rounded hover:bg-gray-200"
            onClick={handleClickOpen}
          >
            <DeleteIcon />
            Delete
          </button>
        </div>{' '}
        <div className="grid grid-cols-7 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span className="col-span-2">Email</span>
          <span>Full name</span>
          <span>Permission</span>
          <span>Date created</span>
          <span>Status</span>
        </div>
        {dataMembers.map((member) => (
          <MemberItem key={member.id} member={member} handleCheckItemClick={handleCheckItemClick} />
        ))}
        <DialogDelete
          label="Do you want to remove the member?"
          subContnet="Please consider this carefully, deleted members cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </LayoutAdminPage>
  );
}

export default Cpanel;
