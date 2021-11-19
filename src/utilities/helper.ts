import { indexOf } from 'lodash';

export function truncate(string: string, n: number) {
  return string?.length > n ? string.substr(0, n - 1) + '...' : string;
}

export function truncateBody(string: string, n: number) {
  return string?.length > n ? string.substr(0, indexOf(string, '#', 2)) + ' ...' : string;
}

export function replaceTagBr(string: string) {
  return string.split('\n').join('<br/>');
}

export function paging(currentPage: number, totalPage: number) {
  var current = currentPage,
    last = totalPage,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
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
