import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import CustumerItem from '../../Components/admin/components/CustomerItem';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
import DialogDelete from '../../Components/admin/common/dialogDelete';

function Cpanel(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const customerFake = [
    {
      id: '1',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'Diem',
      phone: '03123456',
      createAt: '25/08/200 08:25',
      status: 'active',
      selected: false,
    },
    {
      id: '2',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'Diem',
      phone: '03123456',
      createAt: '25/08/200 08:25',
      status: 'active',
      selected: false,
    },
    {
      id: '3',
      email: 'duc12a1cauxe0825@gmail.com',
      name: 'ReactJS',
      phone: '03123456',
      createAt: '25/08/200 08:25',
      status: 'active',
      selected: false,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataCustomers, setDataCustomers] = useState(customerFake);

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

  return (
    <LayoutAdminPage title="Customer">
      <HeaderAdmin
        titlePage="Khách hàng"
        subTitlePage="Tài khoản đăng kí khách hàng 6"
        searchPlaceholder="Email khách hàng..."
      />

      <div className="flex items-center gap-x-10 mb-10">
        <div className="flex-1 bg-white rounded p-4 px-6">
          <h6 className="pb-4 mb-4 border-b-2 border-gray-600">Đang chờ xét duyệt</h6>
          <div className="grid grid-cols-5 bg-titleAdmin px-4 py-2 font-medium items-center rounded-sm">
            <span className="col-span-2">Email</span>
            <span className="col-span-2">Họ tên</span>
            <span>Ngày tạo</span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded p-4 px-6">
          <h6 className="pb-4 mb-4 border-b-2 border-gray-600">Đã xoá</h6>
          <div className="grid grid-cols-5 bg-titleAdmin px-4 py-2 font-medium items-center rounded-sm">
            <span className="col-span-2">Email</span>
            <span className="col-span-2">Họ tên</span>
            <span>Ngày xoá</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded p-4 px-6">
        <div className="flex justify-between pb-4 mb-4 border-b-2 border-gray-600">
          <h4 className="">Hashtag list</h4>
          <button
            disabled={typeof hasSelectedCustomer === 'undefined' ? true : false}
            className="px-4 py-2 border border-gray-300 cursor-pointer rounded hover:bg-gray-200"
            onClick={handleClickOpen}
          >
            Delete
          </button>
        </div>{' '}
        <div className="grid grid-cols-7 bg-titleAdmin px-3 py-1 font-medium items-center rounded-sm">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
            <span className="flex-1">Mã</span>
          </span>
          <span className="col-span-2">Email</span>
          <span>Họ tên</span>
          <span>Số DT</span>
          <span>Ngày tạo</span>
          <span>Trạng thái</span>
        </div>
        {dataCustomers.map((customer) => (
          <CustumerItem
            key={customer.id}
            customer={customer}
            handleCheckItemClick={handleCheckItemClick}
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
    </LayoutAdminPage>
  );
}

export default Cpanel;
