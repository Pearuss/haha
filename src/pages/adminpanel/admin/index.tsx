/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import { useRouter } from 'next/router';

import DialogDelete from '../../../Components/admin/common/dialogDelete';
import Popup from '../../../Components/admin/common/popUp';
import FormUpdateAdmin from '../../../Components/admin/components/FormUpdateAdmin';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import MemberItem from '../../../Components/admin/components/MemberItem';
import LayoutAdminPage from '../../../Components/admin/layout';
import useSWR from 'swr';

function AdminPage() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataMembers, setDataMembers] = useState<any>([]);
  const [adminSelected, setAdminSelected] = useState();

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/user/all-admin`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });
  console.log(dataMembers);

  useEffect(() => {
    if (data?.data) {
      setDataMembers(data.data.map((post: any) => ({ ...post, selected: false })));
    }
  }, [data]);

  const hasSelectedMember = useMemo(
    () => dataMembers.find((member: any) => member.selected === true),
    [dataMembers]
  );

  useEffect(() => {
    const isSelectedAll = dataMembers.find((member: any) => member.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataMembers]);

  const handleSelectAllClick = () => {
    const newDataMembers = [...dataMembers].map((member) => ({ ...member, selected: !selectAll }));
    setSelectAll(!selectAll);
    setDataMembers(newDataMembers);
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

  const handleDeleteClick = () => {
    const dataSelected = dataMembers.filter((member: any) => member.selected === true);
    console.log(dataSelected);
    handleClose();
  };

  const handleClickAdd = () => {
    router.push('/adminpanel/admin/create');
  };

  const handleUpdateClick = () => {
    console.log('updated');
  };

  return (
    <LayoutAdminPage title="Member">
      <HeaderAdmin titlePage="Administrator" subTitlePage="" searchPlaceholder="Admin email..." />

      <div className="bg-white rounded h-full p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All user</h4>
          <span className="text-sm mt-2 ml-2">(Total {dataMembers.length})</span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <button onClick={handleClickAdd}>
              <Image src="/images/add-user.png" alt="Add" width={19} height={19} />
            </button>
            <button onClick={handleClickOpen} disabled={typeof hasSelectedMember === 'undefined'}>
              <Image src="/images/delete.png" alt="Delete" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
          </span>
          <span className="ml-[-42%]">Email</span>
          <span>Username</span>
          {/* <span>Permission</span> */}
          <span>Mode</span>
          <span>Date created</span>
          <span>Status</span>
        </div>
        {dataMembers.map((member: any) => (
          <MemberItem
            setOpenPopup={setOpenPopup}
            setAdminSelected={setAdminSelected}
            key={member.id}
            member={member}
            handleCheckItemClick={handleCheckItemClick}
          />
        ))}
        <DialogDelete
          label="Do you want to remove the member?"
          subContnet="Please consider this carefully, deleted members cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
      <Popup title="Update Admin" openPopup={openPopup}>
        <FormUpdateAdmin
          admin={adminSelected}
          setOpenPopup={setOpenPopup}
          handleUpdateClick={handleUpdateClick}
        />
      </Popup>
    </LayoutAdminPage>
  );
}

export default AdminPage;
