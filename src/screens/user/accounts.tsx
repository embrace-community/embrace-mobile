import type { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AccountCard from '@/components/account-card';

type Props = {
  navigation: NativeStackNavigationHelpers;
};

export default function Home({ navigation }: Props) {
  const profiles = [
    {
      handle: '0x123',
      displayName: '0x123',
      localAvatarUri: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    },
  ];

  return (
    <SafeAreaView className="flex flex-1 items-center justify-center gap-3 bg-slate-100">
      <FlatList
        className="w-full flex-1 gap-3 px-5 py-8"
        data={profiles}
        renderItem={({ item }) => (
          <AccountCard profile={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.handle}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <Text className="px-8 text-center text-lg text-gray-600">
            No profiles found
          </Text>
        )}
      />
    </SafeAreaView>
  );
}
