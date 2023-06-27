import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { UserAccountsScreen, UserCreateAccountScreen } from '@/screens';

export type UserStackParamList = {
  UserAccounts: undefined;
  UserCreateAccount: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParamList>();

export const UserNavigator = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        animation: 'none',
      }}
    >
      <UserStack.Screen name="UserAccounts" component={UserAccountsScreen} />
      <UserStack.Screen
        name="UserCreateAccount"
        component={UserCreateAccountScreen}
      />
    </UserStack.Navigator>
  );
};
