function timeSince(date: Date): string {
  const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}
console.log(timeSince(new Date('2021-12-29T07:18:23.775Z')));
