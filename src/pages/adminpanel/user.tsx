/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import useSWR from 'swr';

import Popup from '../../Components/admin/common/popUp';
import CustomerItem from '../../Components/admin/components/CustomerItem';
import FormUpdateUser from '../../Components/admin/components/FormUpdateUser';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../Components/admin/layout';
import useFetch from '../../hooks/use-fetch';

function Cpanel() {
  const [openPopup, setOpenPopup] = useState(false);
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

  const handleUpdateClick = async (id: number, status: number, role: number) => {
    setOpenPopup(false);

    const response = await useFetch('/api/v1/user/change-status', {
      method: 'PUT',
      body: JSON.stringify({
        userId: id,
        status: status ? 1 : 0,
        role,
        mods: [],
      }),
    });
    if (response.message === 200) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      router.reload();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not authorized to do that!',
      });
    }
  };

  return (
    <LayoutAdminPage title="Customer">
      <HeaderAdmin
        titlePage="User Management"
        subTitlePage=""
        searchPlaceholder="Email user..."
        showSearch
      />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All user</h4>
          <span className="text-sm mt-2 ml-2">
            (Total
            {dataCustomers.length}
            )
          </span>
          {/* <button
            className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer"
            onClick={handleClickOpen}
            disabled={typeof hasSelectedCustomer === 'undefined'}
          >
            <Image
              loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
              alt="Delete"
              width={20}
              height={20}
            />
          </button> */}
        </div>

        <div className="grid grid-cols-5 bg-titleAdmin px-3 py-1 font-medium items-center rounded-sm">
          <span className=" ml-[10%]">Email</span>
          <span>Username</span>
          <span>Total articles</span>
          <span>Date created</span>
          <span>Status</span>
        </div>
        {dataCustomers.map((customer: any) => (
          <CustomerItem
            key={customer.id}
            customer={customer}
            setOpenPopup={setOpenPopup}
            setUserSelected={setUserSelected}
          />
        ))}
      </div>
      <Popup title="Update user" open={openPopup}>
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
