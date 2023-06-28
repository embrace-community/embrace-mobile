import { styled, useColorScheme } from 'nativewind';
import * as React from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput as NTextInput } from 'react-native';

import { isRTL } from '@/core';

import colors from '../../theme/colors';
import { Text } from '../text';
import { View } from '../view';

const STextInput = styled(NTextInput);
import classNames from 'classnames';

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const { label, error, className, ...inputProps } = props;
  const includedClassNames = className ?? '';

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isFocused, setIsFocused] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocused(false), []);
  const onFocus = React.useCallback(() => setIsFocused(true), []);

  const borderColor = error
    ? 'border-danger-600'
    : isFocused
    ? isDark
      ? 'border-white'
      : 'border-neutral-600'
    : isDark
    ? 'border-slate-700'
    : 'border-neutral-400';

  const bgColor = isDark
    ? 'bg-slate-800'
    : error
    ? 'bg-danger-50'
    : 'bg-neutral-200';
  const textDirection = isRTL ? 'text-right' : 'text-left';
  return (
    <View className="mb-4">
      {label && (
        <Text
          variant="md"
          className={
            error ? 'text-danger-600' : isDark ? 'text-slate-100' : 'text-black'
          }
        >
          {label}
        </Text>
      )}
      <STextInput
        testID="STextInput"
        ref={ref}
        placeholderTextColor={colors.neutral[400]}
        className={classNames({
          'mt-0 border-[1px] px-2 py-4 rounded-md text-[16px] dark:text-slate-100':
            true,
          [borderColor]: true,
          [bgColor]: true,
          [textDirection]: true,
          [includedClassNames]: true,
        })}
        onBlur={onBlur}
        onFocus={onFocus}
        {...inputProps}
        style={StyleSheet.flatten([
          { writingDirection: isRTL ? 'rtl' : 'ltr' },
        ])}
      />
      {error && <Text variant="error">{error}</Text>}
    </View>
  );
});
