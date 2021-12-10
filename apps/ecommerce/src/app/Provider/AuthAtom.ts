import { atom } from 'recoil';

export const authStatus = atom({
  key: 'authStatus',
  default: 'uncertain',
});

export const tokenStatus = atom({
  key: 'tokenStatus',
  default: '',
});
