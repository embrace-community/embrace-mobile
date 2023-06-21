import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { useIsSetup } from '@/core/storage/hooks';

import { AccountNavigator } from './account-navigator';
import { NavigationContainer } from './navigation-container';
import { SetupNavigator } from './setup-navigator';
import { UserNavigator } from './user-navigator';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const [isSetup] = useIsSetup();

  useEffect(() => {
    async function hideSplash() {
      await SplashScreen.hideAsync();
    }

    hideSplash();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'fade_from_bottom',
      }}
    >
      {!isSetup ? (
        <Stack.Screen name="Setup" component={SetupNavigator} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="User" component={UserNavigator} />
          <Stack.Screen name="Account" component={AccountNavigator} />
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
