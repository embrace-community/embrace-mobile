import * as Updates from 'expo-updates';
import type TranslateOptions from 'i18next';
import i18n from 'i18next';
import memoize from 'lodash.memoize';
import { useCallback } from 'react';
import { NativeModules } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

import { defaultStorage } from '../storage';
import type { Language, resources } from './resources';
import type { RecursiveKeyOf } from './types';

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const LOCALE = 'locale';

export const getLanguage = () => defaultStorage.getString(LOCALE);

export const translate = memoize(
  (key: TxKeyPath, options = undefined) =>
    i18n.t(key, options) as unknown as string,
  (key: TxKeyPath, options: typeof TranslateOptions) =>
    options ? key + JSON.stringify(options) : key
);

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);
  // if (lang === 'ar') {
  //   I18nManager.forceRTL(true);
  // } else {
  //   I18nManager.forceRTL(false);
  // }
  if (__DEV__) NativeModules.DevSettings.reload();
  else Updates.reloadAsync();
};

export const useSelectedLanguage = () => {
  const [language, setLang] = useMMKVString(LOCALE);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLang(lang);
      if (lang !== undefined) changeLanguage(lang as Language);
    },
    [setLang]
  );

  return { language: language as Language, setLanguage };
};
