import { MMKV } from 'react-native-mmkv';

type StorageKeys = {
  IS_SETUP: string;
};

export const defaultStorageKeys: StorageKeys = {
  IS_SETUP: 'IS_SETUP',
};

export const defaultStorage = new MMKV({
  id: 'mmkv.default',
  encryptionKey: 'randomEncryptionKey',
});
