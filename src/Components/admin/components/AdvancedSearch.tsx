import React, { ReactElement } from 'react';

import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

function AdvancedSearch(): ReactElement {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  return (
    <div className="bg-white rounded h-200px p-4 px-6 mb-4 ">
      <h4 className="pb-4 mb-4 border-b-2 border-gray-600">Advanced search</h4>
      <div className="flex items-center gap-10">
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-gray-700 tracking-wide">Keyword</span>
          <input
            className="border border-grayBorder rounded w-[220px] py-[9px] px-3 outline-none"
            type="text"
            placeholder="Author..."
          />
        </div>
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-gray-700 tracking-wide">Approval date</span>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
              }}
              renderInput={(startProps: any, endProps: any) => (
                <React.Fragment>
                  <TextField {...startProps} size="small" />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} size="small" />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="flex items-center mt-6">
          <button className="bg-titleAdmin py-[9px] px-6 mr-4 rounded font-medium tracking-wider text-gray-600">
            Search
          </button>
          <button className="bg-titleAdmin py-[9px] px-6 mr-4 rounded font-medium tracking-wider text-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
