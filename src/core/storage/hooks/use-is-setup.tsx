import { useMMKVBoolean } from 'react-native-mmkv';

import { defaultStorage, defaultStorageKeys } from '../default';

export const useIsSetup = () => {
  const [isSetup, setIsSetup] = useMMKVBoolean(
    defaultStorageKeys.IS_SETUP,
    defaultStorage
  );
  if (isSetup === undefined) {
    return [false, setIsSetup] as const;
  }
  return [isSetup, setIsSetup] as const;
};
