import React from 'react';

import { ScrollView, View } from '@/ui';

import { ButtonVariants } from '../components/button-variants';
import { ColorVariants } from '../components/color-variants';
import { InputVariants } from '../components/input-variants';
import { TextVariants } from '../components/text-variants';

export const Style = () => {
  return (
    <ScrollView>
      <View className="flex-1  px-4 pt-10">
        <TextVariants />
        <ColorVariants />
        <InputVariants />
        <ButtonVariants />
      </View>
    </ScrollView>
  );
};
