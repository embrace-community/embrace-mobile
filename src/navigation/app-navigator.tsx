import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AccountsScreen, CreateAccountScreen } from '@/screens';

export type AppStackParamList = {
  Accounts: undefined;
  CreateAccount: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerBackVisible: false,
        animation: 'none',
      }}
    >
      <AppStack.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{ headerShown: true }}
      />
      <AppStack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};
