/* eslint-disable */
import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Popup from '../../../Components/admin/common/popUp';
import FormUpdateAdmin from '../../../Components/admin/components/FormUpdateAdmin';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import MemberItem from '../../../Components/admin/components/MemberItem';
import LayoutAdminPage from '../../../Components/admin/layout';
import useSWR from 'swr';
import useFetch from '../../../hooks/use-fetch';
import Swal from 'sweetalert2';

function AdminPage() {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [adminSelected, setAdminSelected] = useState();

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/user/all-admin`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });

  const handleClickAdd = () => {
    router.push('/adminpanel/admin/create');
  };

  const handleUpdateClick = async (id: number, status: number, role: number, mods: number[]) => {
    setOpenPopup(false);

    const response = await useFetch('/api/v1/user/change-status', {
      method: 'PUT',
      body: JSON.stringify({
        userId: id,
        status: status ? 1 : 0,
        role,
        mods,
      }),
    });
    if (response.message === 200) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Admin has been saved',
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
    <LayoutAdminPage title="Member">
      <HeaderAdmin
        titlePage="Administrator"
        subTitlePage=""
        searchPlaceholder="Admin email..."
        showSearch={false}
      />

      <div className="bg-white rounded h-full p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All admin</h4>
          <span className="text-sm mt-2 ml-2">(Total {data?.data?.length})</span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <button onClick={handleClickAdd}>
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/add-user.png`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/add-user.png`}
                alt="Add"
                width={19}
                height={19}
              />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="col-span-2">Email</span>
          <span>Username</span>
          <span>Mode</span>
          <span>Date created</span>
          <span>Status</span>
        </div>
        {data?.data?.map((member: any) => (
          <MemberItem
            setOpenPopup={setOpenPopup}
            key={member.id}
            member={member}
            setAdminSelected={setAdminSelected}
          />
        ))}
      </div>
      <Popup title="Update Admin" open={openPopup}>
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
