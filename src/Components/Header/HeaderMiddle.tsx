import React, { useEffect, useRef, useState } from 'react';

import { SearchIcon } from '@heroicons/react/solid';

import useFetch from '../../hooks/use-fetch';
import ResultItem from './ResultItem';

function HeaderMiddle() {
  const [listResult, setListResult] = useState<any>([]);
  const [isTyping, setIsTyping] = useState<boolean>();
  const typingTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const searchBox: any = document.querySelector('.searchBox');
    searchBox.addEventListener('focus', () => {
      setIsTyping(true);
    });
    searchBox.addEventListener('blur', () => {
      setTimeout(() => {
        setIsTyping(false);
      }, 100);
    });

    window.addEventListener(
      'scroll',
      () => {
        setIsTyping(false);
      },
      false,
    );
  }, []);

  useEffect(() => {
    const searchBox: any = document.querySelector('.searchBox');
    const btnSearch: any = document.querySelector('.btnSearch');

    btnSearch?.addEventListener('click', () => {
      searchBox.focus();
    });
  }, []);

  async function searchArticleAsync(keyword: any) {
    if (typingTimeoutRef.current && keyword !== '') {
      const res = await useFetch('/api/v1/user/article/search', {
        method: 'POST',
        body: JSON.stringify({ keyword }),
      });
      if (res?.data) {
        setListResult(res?.data);
      } else setListResult([]);
    } else setListResult([]);
  }

  const handleSearchChange = (e: any) => {
    setIsTyping(true);
    const keyword = e.target.value;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      searchArticleAsync(keyword.trim());
    }, 300);
  };

  return (
    <div className="flex relative items-center border-[1.5px] border-blueCyanLogo md:border-0 sm:border-0 sm:shadow-none md:shadow-none shadow-sm rounded-full text-black ssm:hidden">
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="What are you looking for ?"
        className="searchBox flex flex-1  pl-5 bg-transparent outline-none ssm:hidden"
      />
      <SearchIcon className="btnSearch md:hidden sm:hidden  inline-flex h-8 bg-blueCyanLogo rounded-full p-2 mx-2 cursor-pointer text-white" />
      {listResult.length > 0 && isTyping ? (
        <div className="absolute text-black -bottom-1 left-0 transform translate-y-full w-full bg-white border border-grayBorder rounded-md z-10">
          <div className=" overflow-y-scroll max-h-[50vh]">
            {listResult?.map((item: any) => (
              <ResultItem result={item} />
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default HeaderMiddle;
