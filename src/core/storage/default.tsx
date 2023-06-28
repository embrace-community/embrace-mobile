import { MMKV, useMMKVBoolean } from 'react-native-mmkv';

type StorageKeys = {
  IS_SETUP: string;
};

export const defaultStorageKeys: StorageKeys = {
  IS_SETUP: 'IS_SETUP',
};

export const defaultStorage = new MMKV({
  id: 'mmkv.default',
  encryptionKey: 'randomEncryptionKey', // TODO: Encrypt this
});

export const useIsOnboarded = () => {
  const [isOnboarded, setIsOnboarded] = useMMKVBoolean(
    defaultStorageKeys.IS_SETUP,
    defaultStorage
  );
  if (isOnboarded === undefined) {
    return [false, setIsOnboarded] as const;
  }
  return [isOnboarded, setIsOnboarded] as const;
};
