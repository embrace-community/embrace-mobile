import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CreateAccountScreen, GettingStartedScreen } from '@/screens';

export type OnboardingStackParamList = {
  GettingStarted: undefined;
  CreateAccount: undefined;
};

const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <OnboardingStack.Screen
        name="GettingStarted"
        component={GettingStartedScreen}
      />
      <OnboardingStack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
      />
    </OnboardingStack.Navigator>
  );
};
