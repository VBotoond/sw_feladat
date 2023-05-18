import  { nanoid, customAlphabet } from 'nanoid';

export const createid = size => nanoid(size);

export const createSpecId = size => {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvxywz123456789', size);
  // a https://zelark.github.io/nano-id-cc/ alapján, 1000 próbálkozás/óra sebességgel
  // 6 karakter esetén 6 óra, 8 karakter esetén 9 nap kell ahhoz, hogy
  // legalább 1% eséllyel ismétlődést kapjunk ezzel a karakterkészlettel
  return nanoid();
}