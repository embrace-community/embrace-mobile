import { useMMKVBoolean } from 'react-native-mmkv';

import { storage, storageKeys } from '../storage';

export const useIsSetup = () => {
  const [isSetup, setIsSetup] = useMMKVBoolean(storageKeys.IS_SETUP, storage);
  if (isSetup === undefined) {
    return [false, setIsSetup] as const;
  }
  return [isSetup, setIsSetup] as const;
};
