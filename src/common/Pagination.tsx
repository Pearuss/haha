import React, { useEffect, useState } from 'react';

export default function Pagination({ totalPage, currentPage }: any): any {
  const [pagination, setPagination] = useState<number[]>([]);

  useEffect(() => {
    const pagination = [];
    for (let i = 1; i <= totalPage; i++) {
      pagination.push(i);
    }
    setPagination(pagination);
  }, [totalPage]);

  return (
    <ul className="flex">
      <li>first</li>
      {totalPage <= 6
        ? pagination.map((page) => <li>{page}</li>)
        : currentPage > 3 ? pagination.map((page) => {
            if(currentPage > 3) return <div/>
        })}
      <li>last</li>
    </ul>
  );
}
