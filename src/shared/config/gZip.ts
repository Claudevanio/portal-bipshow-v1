/* eslint-disable no-buffer-constructor */
import { unzip } from 'gzip-js';

export function gzip(base64: string) {
  const unZip = unzip(new Buffer(base64, 'base64'));

  let str = '' as string;
  unZip.forEach((code) => {
    str += String.fromCharCode(code);
  });

  return JSON.parse(str);
}