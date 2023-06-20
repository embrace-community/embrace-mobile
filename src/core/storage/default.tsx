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

// TODO: Only allow when in dev mode
defaultStorage.clearAll();

export function getItem<T>(key: string): T {
  const value = defaultStorage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  defaultStorage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  defaultStorage.delete(key);
}
