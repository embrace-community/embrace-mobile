import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { useIsSetup } from '@/core/storage/hooks';

import { Setup } from '../screens';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';

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
