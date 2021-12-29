/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
import { indexOf } from 'lodash';

export function truncate(string: string, n: number) {
  return string?.length > n ? `${string.substr(0, n - 1)}...` : string;
}

export function truncateBody(string: string, n: number) {
  return string?.length > n ? `${string.substr(0, indexOf(string, '#', 2))} ...` : string;
}

export function replaceTagBr(string: string) {
  return string.split('\n').join('<br/>');
}

export function paging(currentPage: number, totalPage: number) {
  const current = currentPage;
  const last = totalPage;
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export function convertReplyTagInit(string: string, id: number) {
  if (string[0] !== '@') return string;
  const mention = string.split(' ');
  mention[0] = `<a href="/user/${id}" style="color:#76dce6; font-weight: 500;">${mention[0]}</a>`;
  const result = mention.join(' ');
  return result;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function countWord(string: string) {
  return string.split(' ').length;
}

export function formatDate(dateObj: Date): string {
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = `${month} ${day} ${year}`;
  return output;
}
