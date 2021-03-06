/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
import { indexOf } from 'lodash';

export function truncate(string: string, n: number) {
  return string?.length > n ? `${string.substr(0, n - 1)}...` : string;
}

export function truncateBody(string: string, n: number) {
  return string?.length > n && indexOf(string, '#', 3) > 0
    ? `${string.substr(0, indexOf(string, '#', 3))} ...`
    : string;
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

export function timeAgo(date: Date) {
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

const createImage = (url: string) => new Promise((resolve, reject) => {
  const image = new Image();
  image.addEventListener('load', () => resolve(image));
  image.addEventListener('error', (error) => reject(error));
  image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
  image.src = url;
});

function getRadianAngle(degreeValue: any) {
  return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(imageSrc: string, pixelCrop: any, rotation = 0) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y,
  );

  // As Base64 string
  return canvas.toDataURL('image/jpeg');
  // return canvas;
}

const cleanAccents = (str: string): string => {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
  str = str.replace(/??|??|???|???|??/g, 'I');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
  str = str.replace(/???|??|???|???|???/g, 'Y');
  str = str.replace(/??/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huy???n, s???c, h???i, ng??, n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // m?? ?? (??), m?? ??, m?? ?? (??)

  return str;
};

const toTitleCase = (str: any) => str.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase());

export const createSlug = (str: string): string => toTitleCase(cleanAccents(str.trim()))
  .replace(/[^\w\s]/gi, '')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\s/g, '-');
