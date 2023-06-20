import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useIsSetup } from '@/core';

import { Setup } from '../screens';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';
const Stack = createNativeStackNavigator();

export const Root = () => {
  const [isSetup] = useIsSetup();
  // const isSetup = false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        animation: 'fade_from_bottom',
      }}
    >
      {!isSetup ? (
        <Stack.Screen name="Setup" component={Setup} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="App" component={TabNavigator} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
