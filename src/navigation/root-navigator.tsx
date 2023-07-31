import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

import useProfile from '@/core/hooks/use-profile';
import { useIsOnboarded } from '@/core/storage';

import { AccountNavigator } from './account-navigator';
import { AppNavigator } from './app-navigator';
import { NavigationContainer } from './navigation-container';
import { OnboardingNavigator } from './onboarding-navigator';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const [isOnboarded] = useIsOnboarded();
  // TODO: Remove this - just for testing whether profiles have been created
  const { profiles } = useProfile();
  console.log('profiles', profiles);

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
