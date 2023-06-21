import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Accounts from '../screens/user/accounts';

const UserStack = createNativeStackNavigator();

export const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerBackVisible: false }}>
      <UserStack.Screen name="Accounts" component={Accounts} />
    </UserStack.Navigator>
  );
};
