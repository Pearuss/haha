/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { Button, DialogActions, TextField } from '@mui/material';
import Swal from 'sweetalert2';

import useFetch from '../../../hooks/use-fetch';

export default function FormUpdateTag(props: any) {
  const { setOpenPopup, tag, setCallMutateAgain } = props;
  const [tagName, setTagName] = useState(tag.name);
  const [priority, setPriority] = useState<any>(1000);

  const updateTagHandler = async () => {
    if (tagName.trim().length === 0) return;
    setOpenPopup(false);
    const res = await useFetch(`/api/v1/tags/${tag.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: tagName,
        priority,
      }),
    });
    if (res?.message === 200) {
      Swal.fire('Successfully!');
      // await mutate();
      setCallMutateAgain(true);
    } else {
      Swal.fire('Tag name is invalid!');
    }
  };
  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Name*</span>
        <TextField
          defaultValue={tagName}
          onChange={(e) => setTagName(e.target.value)}
          size="small"
          id="outlined-basic"
          variant="outlined"
        />
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Priority</span>
        <TextField
          defaultValue={priority}
          onChange={(e) => setPriority(e.target.value)}
          size="small"
          id="outlined-basic"
          variant="outlined"
        />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button autoFocus onClick={updateTagHandler}>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
