import { Env } from '@env';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@realm/react';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import AccountCard from '@/components/account-card';
import { useNumCreatedAccounts } from '@/core';
import { Profile } from '@/db/local/profile-model';
import { Button, Text } from '@/ui';

export const AccountsScreen = () => {
  const { navigate } = useNavigation();
  const [createAccountIcon, setCreateAccountIcon] =
    React.useState<JSX.Element | null>(null);
  const maxNumberOfAccounts = Number(Env.MAX_NUMBER_OF_ACCOUNTS);
  const [numCreatedAccounts] = useNumCreatedAccounts();

  const profiles = useQuery(Profile);

  useEffect(() => {
    if (numCreatedAccounts < Number(maxNumberOfAccounts)) {
      const _createAccountIcon = (
        <View className="mx-auto mt-3 w-16">
          <Button
            onPress={() => navigate('App', { screen: 'CreateAccount' })}
            className="mb-4 rounded-full p-5"
            icon={
              <AntDesign
                name="plus"
                size={24}
                color="white"
                style={{ zIndex: 0 }} // eslint-disable-line react-native/no-inline-styles
              />
            }
          />
        </View>
      );

      setCreateAccountIcon(_createAccountIcon);
    } else {
      setCreateAccountIcon(null);
    }
  }, [numCreatedAccounts, navigate, maxNumberOfAccounts]);

  return (
    <SafeAreaView className=" flex flex-1 items-center justify-center gap-3 ">
      <FlatList
        className="w-full flex-1 px-5 py-6"
        data={profiles}
        renderItem={({ item }) => <AccountCard profile={item} />}
        keyExtractor={(item) => item._id.toString()}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <Text className="px-8 text-center text-lg text-gray-600">
            No profiles found
          </Text>
        )}
        ListFooterComponent={createAccountIcon}
      />
    </SafeAreaView>
  );
};
