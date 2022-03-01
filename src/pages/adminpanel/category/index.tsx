/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import DialogDelete from '../../../Components/admin/common/dialogDelete';
import CategoryItem from '../../../Components/admin/components/CategoryItem';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';
import Link from 'next/link';
import { Tooltip } from '@mui/material';

function Category() {
  const [openDialog, setOpenDialog] = useState(false);
  const [callGetCateAgain, setCallGetCateAgain] = useState(false);
  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/category/full-list`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });

  useEffect(() => {
    if (callGetCateAgain) {
      mutate();
      setCallGetCateAgain(false);
    }
  }, [callGetCateAgain]);

  return (
    <LayoutAdminPage title="Category">
      <HeaderAdmin
        titlePage="Category Management"
        subTitlePage=""
        searchPlaceholder="Search category..."
        showSearch={true}
      />

      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All category</h4>
          <span className="text-sm mt-2 ml-2">
            (Total{` `}
            {data?.data?.length})
          </span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <Link href="/adminpanel/category/create">
              <Tooltip title="Add">
                <button>
                  <Image
                    loader={() =>
                      `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/plus.png`
                    }
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/plus.png`}
                    alt="Add"
                    width={19}
                    height={19}
                  />
                </button>
              </Tooltip>
            </Link>
            <Tooltip title="Disable all">
              <button onClick={async () => await mutate()}>
                <Image
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`
                  }
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
                  alt="Delete"
                  width={20}
                  height={20}
                />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="col-span-2">Category Name</span>
          <span>Type</span>
          <span>Date created</span>
          <span>Total articles</span>
          <span>Status</span>
        </div>
        {data?.data.map((cat: any) => (
          <CategoryItem key={cat.id} cat={cat} setCallGetCateAgain={setCallGetCateAgain} />
        ))}
        <DialogDelete
          label="Do you want to remove the category?"
          subContnet="Please consider this carefully, deleted categorys cannot be recovered."
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </LayoutAdminPage>
  );
}

export default Category;
