import { indexOf } from 'lodash';

export function truncate(string: string, n: number) {
  //  console.log(indexOf(string, '#', 2));

  return string?.length > n ? string.substr(0, n - 1) + '...' : string;
}
