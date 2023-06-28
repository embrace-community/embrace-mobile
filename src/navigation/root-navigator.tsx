import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { useIsOnboarded } from '@/core/storage';

import { AccountNavigator } from './account-navigator';
import { NavigationContainer } from './navigation-container';
import { OnboardingNavigator } from './onboarding-navigator';
import { UserNavigator } from './user-navigator';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const [isOnboarded] = useIsOnboarded();

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
        animation: 'none',
      }}
    >
      {!isOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
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
