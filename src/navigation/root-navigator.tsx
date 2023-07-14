import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

import { useIsOnboarded } from '@/core/storage';

import { AccountNavigator } from './account-navigator';
import { AppNavigator } from './app-navigator';
import { NavigationContainer } from './navigation-container';
import { OnboardingNavigator } from './onboarding-navigator';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const [isOnboarded] = useIsOnboarded();

  React.useEffect(() => {
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
          <Stack.Screen name="App" component={AppNavigator} />
          <Stack.Screen name="Account" component={AccountNavigator} />
          {/* <Stack.Screen name="Community" component={CommunityNavigator} /> */}
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
