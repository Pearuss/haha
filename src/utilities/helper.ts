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
