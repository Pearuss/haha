/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import useSWR from 'swr';

import DialogDelete from '../../Components/admin/common/dialogDelete';
import Popup from '../../Components/admin/common/popUp';
import CustomerItem from '../../Components/admin/components/CustomerItem';
import FormUpdateUser from '../../Components/admin/components/FormUpdateUser';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../Components/admin/layout';
import useFetch from '../../hooks/use-fetch';

function Cpanel() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataCustomers, setDataCustomers] = useState<any>([]);
  const [userSelected, setUserSelected] = useState();

  const router = useRouter();

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/user/all-client`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });

  useEffect(() => {
    if (data?.data) {
      setDataCustomers(data.data.map((post: any) => ({ ...post, selected: false })));
    }
  }, [data]);

  const hasSelectedCustomer = useMemo(
    () => dataCustomers.find((customer: any) => customer.selected === true),
    [dataCustomers],
  );

  useEffect(() => {
    const isSelectedAll = dataCustomers.find((customer: any) => customer.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataCustomers]);

  const handleSelectAllClick = () => {
    const newDataCustomers = [...dataCustomers].map((customer) => ({
      ...customer,
      selected: !selectAll,
    }));
    setSelectAll(!selectAll);
    setDataCustomers(newDataCustomers);
  };

  const handleCheckItemClick = (customer: any) => {
    const index = dataCustomers.indexOf(customer);
    const newDataCustomers = [...dataCustomers];
    newDataCustomers.splice(index, 1, { ...customer, selected: !customer.selected });
    setDataCustomers(newDataCustomers);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteClick = () => {
    const dataSelected = dataCustomers.filter((customer: any) => customer.selected === true);
    console.log(dataSelected);
    handleClose();
  };

  const handleUpdateClick = async (id: number, status: number) => {
    setOpenPopup(false);

    const response = await useFetch('/api/v1/user/change-status', {
      method: 'PUT',
      body: JSON.stringify({
        userId: id,
        status: status ? 1 : 0,
      }),
    });
    if (response.message === 200) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Status has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      router.reload();
    }
  };

  return (
    <LayoutAdminPage title="Customer">
      <HeaderAdmin titlePage="User Management" subTitlePage="" searchPlaceholder="Email user..." />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All user</h4>
          <span className="text-sm mt-2 ml-2">
            (Total
            {dataCustomers.length}
            )
          </span>
          <button
            className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer"
            onClick={handleClickOpen}
            disabled={typeof hasSelectedCustomer === 'undefined'}
          >
            {/* <Image src="/images/share.png" width={20} height={20} /> */}
            <Image
              loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
              alt="Delete"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center rounded-sm">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
          </span>
          <span className=" ml-[-42%]">Email</span>
          <span>Username</span>
          <span>Total articles</span>
          <span>Date created</span>
          <span>Status</span>
        </div>
        {dataCustomers.map((customer: any) => (
          <CustomerItem
            key={customer.id}
            customer={customer}
            handleCheckItemClick={handleCheckItemClick}
            setOpenPopup={setOpenPopup}
            setUserSelected={setUserSelected}
          />
        ))}
        <DialogDelete
          label="Do you want to remove customer?"
          subContnet="Please consider this carefully, deleted customers cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
      <Popup title="Update user" openPopup={openPopup}>
        <FormUpdateUser
          user={userSelected}
          setOpenPopup={setOpenPopup}
          handleUpdateClick={handleUpdateClick}
        />
      </Popup>
    </LayoutAdminPage>
  );
}

export default Cpanel;
