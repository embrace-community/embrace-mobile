import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CreateAccountScreen } from '../screens/setup/create-account';
import { GettingStartedScreen } from '../screens/setup/getting-started';
// import MainStackScreen from './MainStack';

const SetupStack = createNativeStackNavigator();

export const SetupNavigator = () => {
  return (
    <SetupStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <SetupStack.Screen
        name="GettingStarted"
        component={GettingStartedScreen}
      />
      <SetupStack.Screen name="CreateAccount" component={CreateAccountScreen} />
      {/* <SetupStack.Screen name="Main" component={MainStackScreen} /> */}
    </SetupStack.Navigator>
  );
};
