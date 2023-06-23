import { useQuery } from '@realm/react';
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import AccountCard from '@/components/account-card';
import { Profile } from '@/db/local/profile-model';
import { Text } from '@/ui';

export default function Home() {
  const profiles = useQuery(Profile);

  return (
    <SafeAreaView className="flex flex-1 items-center justify-center gap-3 bg-slate-100">
      <FlatList
        className="w-full flex-1 px-5 py-3"
        data={profiles}
        renderItem={({ item }) => <AccountCard profile={item} />}
        keyExtractor={(item) => item._id.toHexString()}
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
