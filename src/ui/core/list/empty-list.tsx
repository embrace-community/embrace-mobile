import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Text } from '../text';
import { View } from '../view';
type Props = {
  isLoading: boolean;
};
export const EmptyList = React.memo(({ isLoading }: Props) => {
  return (
    <View className="min-h-[400px] flex-1 items-center justify-center">
      {!isLoading ? (
        <View>
          <Entypo name="cross" size={24} />
          <Text className="pt-4 text-center">Sorry! No data found</Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
});
