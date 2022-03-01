/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { Button, Checkbox, DialogActions, TextField } from '@mui/material';
import useFetch from '../../../hooks/use-fetch';
import Swal from 'sweetalert2';

export default function FormUpdateCategory({ setOpenPopup, category, setCallGetCateAgain }: any) {
  const label = { inputProps: { 'aria-label': 'Checkbox status user' } };
  const [categoryName, setCategoryName] = useState(category.name);
  const [checked, setChecked] = useState(category.status);

  const checkboxChangeHandler = (event: any) => {
    setChecked(event.target.checked);
  };

  const updateCategoryHandler = async () => {
    setOpenPopup(false);
    const res = await useFetch(`/api/v1/category/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: categoryName,
        status: checked,
        metaTitle: '',
        metaKeywords: '',
      }),
    });
    if (res?.message === 200) {
      Swal.fire('Successfully!');
      // await mutate();
      setCallGetCateAgain(true);
    } else {
      Swal.fire('Category name is invalid!');
    }
    
  };

  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Name*</span>
        <TextField
          defaultValue={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          size="small"
          id="outlined-basic"
          variant="outlined"
        />
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Status*</span>
        <Checkbox {...label} defaultChecked={checked} onChange={checkboxChangeHandler} />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button onClick={updateCategoryHandler} autoFocus>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
