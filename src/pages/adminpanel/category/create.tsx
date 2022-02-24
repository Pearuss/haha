/* eslint-disable */
import React, { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';

import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';
import Select from 'react-select';
import useSWR from 'swr';
import useFetch from '../../../hooks/use-fetch';
import Swal from 'sweetalert2';

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [checked, setChecked] = useState(false);
  const [mainCategorySelected, setMainCategorySelected] = useState<any>();

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const { data: catData }: any = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/category/parent`, {
    revalidateOnFocus: false,
  });

  const catOptions: { value: string; label: string }[] = catData?.data?.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }));
  const changeMainCategoryHandler = (value: any) => {
    setMainCategorySelected(value.value);
  };

  const CreateCategoryHandler = async () => {
    if (categoryName.trim().length === 0) return;
    if (checked) {
      const res = await useFetch(`/api/v1/category/${mainCategorySelected}`, {
        method: 'POST',
        body: JSON.stringify({
          name: categoryName,
          status: 1,
          metaTitle: '',
          metaKeywords: '',
        }),
      });
      if (res?.message === 200) {
        Swal.fire('Successfully!');
      } else {
        Swal.fire('Category name is invalid!');
      }
    } else {
      const res = await useFetch('/api/v1/category/0', {
        method: 'POST',
        body: JSON.stringify({
          name: categoryName,
          status: 1,
          metaTitle: '',
          metaKeywords: '',
        }),
      });
      if (res?.message === 200) {
        Swal.fire('Successfully!');
      } else {
        Swal.fire('Category name is invalid!');
      }
    }
  };
  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin titlePage="Create a Category" subTitlePage="" searchPlaceholder="Category..." />
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Category information</h5>
        <div className="flex flex-col items-center w-[50vw] mx-auto">
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Name*</span>
            <input
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
              className="w-full py-3 px-4 outline-none rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Sub Category*</span>

            <div className="w-full ml-8 flex items-center">
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <div className="flex items-center w-full ml-6">
                <span className="w-[30%]">Main category: </span>
                <Select
                  // className={`basic-single mb-1 ${
                  //   isErrorCategory ? 'border border-darkRed rounded-md' : ''
                  // }`}
                  className="basic-single w-full"
                  classNamePrefix="select"
                  placeholder="Main category"
                  name="mainCategory"
                  options={catOptions}
                  onChange={changeMainCategoryHandler}
                />
              </div>
            </div>
          </div>
          <button
            onClick={CreateCategoryHandler}
            className="ml-auto py-2 px-6 rounded bg-white text-gray-600 font-medium tracking-wide  mt-8"
          >
            Confirm
          </button>
        </div>
      </div>
    </LayoutAdminPage>
  );
}

export default CreateCategory;
