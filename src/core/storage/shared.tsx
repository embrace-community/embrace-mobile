import type { MMKV } from 'react-native-mmkv';

export function getItem<T>(storage: MMKV, key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(storage: MMKV, key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(storage: MMKV, key: string) {
  storage.delete(key);
}
