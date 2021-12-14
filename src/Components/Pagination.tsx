import React from 'react';
import { paging } from '../utilities/helper';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function Pagination({
  totalPage,
  currentPage,
  goOtherPage,
  goNextPage,
  goPrevPage,
}: any): any {
  return (
    <ul className="flex justify-center mt-5 mb-5">
      <li onClick={goPrevPage} className={`prevPage px-4 py-2 cursor-pointer`}>
        <ArrowBackIosNewIcon />
      </li>
      {paging(currentPage, totalPage).map((page) => {
        if (page === currentPage)
          return (
            <li
              onClick={() => goOtherPage(Number(page))}
              className="px-5 py-2 text-blueCyanLogo text-xl cursor-pointer mx-2"
            >
              {page}
            </li>
          );
        else
          return (
            <li
              onClick={() => goOtherPage(Number(page))}
              className="px-4 py-2 text-xl cursor-pointer mx-2"
            >
              {page}
            </li>
          );
      })}
      <li onClick={goNextPage} className="px-4 py-2 cursor-pointer">
        <ArrowForwardIosIcon />
      </li>
    </ul>
  );
}
