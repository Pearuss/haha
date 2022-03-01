/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';

import DialogDelete from '../../../Components/admin/common/dialogDelete';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import TagItem from '../../../Components/admin/components/TagItem';
import LayoutAdminPage from '../../../Components/admin/layout';

function Tag() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/tags/full-list`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });

  return (
    <LayoutAdminPage title="HashTag">
      <HeaderAdmin
        titlePage="Hashtag"
        subTitlePage=""
        searchPlaceholder="Search tag..."
        showSearch={true}
      />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All hashtag</h4>
          <span className="text-sm mt-2 ml-2">
            (Total{` `}
            {data?.data?.length})
          </span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <Link href="/adminpanel/tag/create">
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
            </Link>
            <button>
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
          </div>
        </div>
        <div className="grid grid-cols-4 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="">Tag Name</span>
          <span>Date created</span>
          <span>Total Articles</span>
          <span>Status</span>
        </div>
        {data?.data?.map((tag: any) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
        {/* <DialogDelete
          label="Do you want to remove the tag?"
          subContnet="Please consider this carefully, deleted tags cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        /> */}
      </div>
    </LayoutAdminPage>
  );
}

export default Tag;
