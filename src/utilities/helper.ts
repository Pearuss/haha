export function truncate(string: string, n: number) {
  return string?.length > n ? string.substr(0, n - 1) + '...' : n;
}
