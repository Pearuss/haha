import React, { useState } from 'react';

import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';

import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
// import Header from '../../Components/admin/common/Header';
import LayoutAdmin from '../../Components/admin/layout/index';

function Dashboard() {
  const [status, setStatus] = useState(10);

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };
  return (
    <LayoutAdmin title="Home">
      <HeaderAdmin
        titlePage="Website maintenance"
        subTitlePage="Cannot access from the user"
        searchPlaceholder="Admin..."
        showSearch={false}
      />
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Notification</h5>
        <div className="flex flex-col items-center w-[50vw] mx-auto">
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Title*</span>
            <input
              //   onChange={(e) => setNewTitle(e.target.value)}
              //   value={newTitle}
              className="w-full py-3 px-4 outline-none rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end mr-[33px] mt-5">
              Control*
            </span>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={status}
                label="Age"
                onChange={handleChange}
                fullWidth
                className="bg-transparent active:bg-transparent"
              >
                <MenuItem value={10}>In progress</MenuItem>
                <MenuItem value={20}>Maintenance</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default Dashboard;
