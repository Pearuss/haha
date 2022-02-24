/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';
import useFetch from '../../../hooks/use-fetch';

function CreateTag() {
  const [tagName, setTagName] = useState<string>('');

  const createTagHandler = async () => {
    console.log(tagName);
    const res = await useFetch('/api/v1/tags', {
      method: 'POST',
      body: JSON.stringify({
        name: tagName,
        type: null,
        priority: null,
      }),
    });
    if (res?.message === 200) {
      Swal.fire('Successfully!');
    } else {
      Swal.fire('Tag name is invalid!');
    }
  };
  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin titlePage="Create a tag" subTitlePage="" searchPlaceholder="Tag..." />
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Tag information</h5>
        <div className="flex flex-col items-center w-[50vw] mx-auto">
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Name*</span>
            <input
              onChange={(e) => setTagName(e.target.value)}
              value={tagName}
              className="w-full py-3 px-4 outline-none rounded ml-8"
              type="text"
            />
          </div>
          <button
            onClick={createTagHandler}
            className="ml-auto py-2 px-6 rounded bg-white text-gray-600 font-medium tracking-wide  mt-8"
          >
            Confirm
          </button>
        </div>
      </div>
    </LayoutAdminPage>
  );
}

export default CreateTag;
