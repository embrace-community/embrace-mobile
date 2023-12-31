import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';

import type { ColorSchemeType } from '@/core';
import { translate, useSelectedTheme } from '@/core';
import type { Option } from '@/ui';
import { Options } from '@/ui';

import { Item } from './item';

export const ThemeItem = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const optionsRef = React.useRef<BottomSheetModal>(null);
  const open = React.useCallback(() => {
    optionsRef.current?.present();
  }, []);

  const onSelect = React.useCallback(
    (option: Option) => {
      setSelectedTheme(option.value as ColorSchemeType);
      optionsRef.current?.dismiss();
    },
    [setSelectedTheme]
  );

  const themes = React.useMemo(
    () => [
      { label: `${translate('settings.theme.dark')} 🌙`, value: 'dark' },
      { label: `${translate('settings.theme.light')} 🌞`, value: 'light' },
      { label: `${translate('settings.theme.system')} ⚙️`, value: 'system' },
    ],
    []
  );

  const theme = React.useMemo(
    () => themes.find((t) => t.value === selectedTheme),
    [selectedTheme, themes]
  );

  return (
    <>
      <Item text="settings.theme.title" value={theme?.label} onPress={open} />
      <Options
        ref={optionsRef}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
      />
    </>
  );
};
