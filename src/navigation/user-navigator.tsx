import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Accounts from '../screens/user/accounts';

export type UserStackParamList = {
  Accounts: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParamList>();

export const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerBackVisible: false }}>
      <UserStack.Screen name="Accounts" component={Accounts} />
    </UserStack.Navigator>
  );
};
