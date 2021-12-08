import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MarkDown from '../../../Components/CreatePost/MarkDown';

function EditPost(): ReactElement {
  const [value, setValue] = React.useState<Date | null>(null);

  const contentBody =
    '# What is this issue?\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\n# Solutions\n```js\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\n```\n# Conclude\nSearch for resources to solve problems like stackoverflow, github,...Search for resources to solve problems like stackoverflow, github,...';

  return (
    <LayoutAdminPage title="Update Post">
      <HeaderAdmin
        titlePage="Blogs"
        subTitlePage="Danh sách bài viết 20"
        searchPlaceholder="Tên bài viết..."
      />
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Nội dung bài viết</h5>
        <div className="flex flex-col items-center w-2/3 mx-auto">
          <div className="flex items-center w-full mt-8">
            <span className="w-[10%] flex font-medium text-gray-600 justify-start ">Title*</span>
            <input className="flex-1 py-3 px-4 outline-none rounded ml-8 max-w-[90%]" type="text" />
          </div>
          <div className="flex items-start w-full mt-8">
            <span className="w-[10%] flex font-medium text-gray-600 justify-start ">
              Short content*
            </span>
            <textarea className="flex-1 py-3 px-4 outline-none rounded ml-8 max-w-[90%]" />
          </div>
          <div className="flex items-start w-full mt-8">
            <span className="w-[10%] flex font-medium text-gray-600 justify-start ">
              Main content*
            </span>
            <div className="flex-1 outline-none rounded ml-8 h-full max-w-[90%]">
              <MarkDown content={contentBody} setNewPost={() => {}} />
            </div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-[10%] flex font-medium text-gray-600 justify-start ">Picture*</span>
            <input className="flex-1 py-3 px-4 outline-none rounded ml-8" type="text" />
          </div>
        </div>
        <h5 className="pb-4 my-4">Tuỳ chỉnh bài viết</h5>
        <div className="flex flex-col items-center w-[50vw] mx-auto">
          <div className="flex items-center w-full mt-8 ml-[-120px]">
            <span className="w-48 flex font-medium text-gray-600 justify-end">
              Ngày đóng bài viết
            </span>
            <div className="ml-8">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Closed Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} size="small" />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end ">
              Trạng thái bài viết
            </span>
            <div className="w-full ml-8">Đang xem</div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end ">Số lần sửa</span>
            <input className="w-full ml-8 py-2 px-4 rounded" type="text" />
          </div>
        </div>
      </div>
    </LayoutAdminPage>
  );
}

export default EditPost;
