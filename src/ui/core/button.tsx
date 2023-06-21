import classNames from 'classnames';
import React from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { ActivityIndicator } from './activity-indicator';
import { Text } from './text';
import { TouchableOpacity } from './touchable-opacity';

type Variant = {
  container: string;
  label: string;
  indicator: string;
};
type VariantName = 'defaults' | 'primary' | 'outline' | 'secondary';
type BVariant = {
  [key in VariantName]: Variant;
};

export const buttonVariants: BVariant = {
  defaults: {
    container: 'flex-row items-center justify-center rounded-md h-16 p-3',
    label: 'text-[16px] text-white',
    indicator: 'text-white h-[30px]',
  },
  primary: {
    container: 'bg-primary-600',
    label: '',
    indicator: 'text-white',
  },
  secondary: {
    container: 'bg-slate-500',
    label: 'text-secondary-600',
    indicator: 'text-white',
  },
  outline: {
    container: 'border border-slate-400',
    label: 'text-slate-600 dark:text-slate-100',
    indicator: 'text-slate-600',
  },
};

interface Props extends TouchableOpacityProps {
  variant?: VariantName;
  label?: string;
  loading?: boolean;
}

export const Button = ({
  label,
  loading = false,
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      className={classNames({
        [buttonVariants.defaults.container]: true,
        [buttonVariants[variant].container]: true,
        'opacity-50': disabled,
        [className]: true,
      })}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          className={`
          ${buttonVariants.defaults.indicator}
           ${buttonVariants[variant].indicator}
          `}
        />
      ) : (
        <Text
          className={`
          ${buttonVariants.defaults.label}
           ${buttonVariants[variant].label}
          `}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
