/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AdvancedSearch(props: any) {
  const {
    handleClickSearch,
    keyword,
    beginDate,
    endDate,
    setKeyword,
    setBeginDate,
    setEndDate,
    handleCancleSearch,
  } = props;
  // const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  return (
    <div className="bg-white rounded h-200px p-4 px-6 mb-4">
      <h4 className="pb-4 mb-4 border-b-2 border-gray-500">Advanced search</h4>
      <div className="flex items-center gap-10">
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-gray-700 tracking-wide">Keyword</span>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-grayBorder rounded w-[220px] py-[9px] px-3 outline-none"
            type="text"
            placeholder="Author, title articles..."
          />
        </div>
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-gray-700 tracking-wide">Public at</span>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              // startText="Start"
              // endText="End"
              value={[beginDate, endDate]}
              onChange={(newValue: any) => {
                setBeginDate(newValue[0]);
                setEndDate(newValue[1]);
              }}
              renderInput={(startProps: any, endProps: any) => (
                <>
                  <TextField {...startProps} size="small" />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} size="small" />
                </>
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="flex items-center mt-6">
          <button
            onClick={handleClickSearch}
            className="bg-titleAdmin py-[9px] px-6 mr-4 rounded font-medium tracking-wider text-gray-600"
          >
            Search
          </button>
          <button
            onClick={handleCancleSearch}
            className="bg-titleAdmin py-[9px] px-6 mr-4 rounded font-medium tracking-wider text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
