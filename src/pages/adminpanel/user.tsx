import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import CustomerItem from '../../Components/admin/components/CustomerItem';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
import DialogDelete from '../../Components/admin/common/dialogDelete';
import Image from 'next/image';
import Popup from '../../Components/admin/common/popUp';
import FormUpdateUser from '../../Components/admin/components/FormUpdateUser';

function Cpanel(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const customerFake = [
    {
      id: '1',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'Pearuss',
      phone: '40',
      createAt: '25/08/2000',
      status: true,
      selected: false,
    },
    {
      id: '2',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'Paine',
      phone: '16',
      createAt: '25/08/2000',
      status: false,
      selected: false,
    },
    {
      id: '3',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'Hunter',
      phone: '12',
      createAt: '25/08/2000',
      status: true,
      selected: false,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataCustomers, setDataCustomers] = useState(customerFake);
  const [userSelected, setUserSelected] = useState();

  const hasSelectedCustomer = useMemo(() => {
    return dataCustomers.find((customer) => customer.selected === true);
  }, [dataCustomers]);

  useEffect(() => {
    const isSelectedAll = dataCustomers.find((customer) => customer.selected === false);
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

  const handleDeleteClick = () => {
    const dataSelected = dataCustomers.filter((customer) => customer.selected === true);
    console.log(dataSelected);
    handleClose();
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

  const handleUpdateClick = () => {
    console.log('updated');
  };

  return (
    <LayoutAdminPage title="Customer">
      <HeaderAdmin titlePage="User Management" subTitlePage="" searchPlaceholder="Email user..." />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All user</h4>
          <span className="text-sm mt-2 ml-2">(3)</span>
          <button
            className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer"
            onClick={handleClickOpen}
            disabled={typeof hasSelectedCustomer === 'undefined' ? true : false}
          >
            {/* <Image src="/images/share.png" width={20} height={20} /> */}
            <Image src="/images/delete.png" width={20} height={20} />
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
          <span className="">Status</span>
        </div>
        {dataCustomers.map((customer) => (
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
