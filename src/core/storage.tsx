import { MMKV } from 'react-native-mmkv';

type StorageKeys = {
  IS_SETUP: string;
};

export const storageKeys: StorageKeys = {
  IS_SETUP: 'IS_SETUP',
};

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}
