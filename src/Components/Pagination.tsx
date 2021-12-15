/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { paging } from '../utilities/helper';

export default function Pagination({
  totalPage,
  currentPage,
  goOtherPage,
  goNextPage,
  goPrevPage,
}: any): any {
  return (
    <ul className="flex text-base justify-center mt-5 mb-5">
      <li onClick={goPrevPage} className="prevPage px-4 py-2 cursor-pointer">
        <ArrowBackIosNewIcon />
      </li>
      {paging(currentPage, totalPage).map((page) => {
        if (page === currentPage) {
          return (
            <li
              onClick={() => goOtherPage(Number(page))}
              className="px-4 py-2 text-blueCyanLogo cursor-pointer"
            >
              {page}
            </li>
          );
        }
        return (
          <li onClick={() => goOtherPage(Number(page))} className="px-4 py-2 cursor-pointer mx-2">
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
