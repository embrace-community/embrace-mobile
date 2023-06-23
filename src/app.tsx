import 'react-native-gesture-handler';
import '@/core/ethers/ethers-init';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RealmProvider } from '@realm/react';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import FlashMessage from 'react-native-flash-message';

import { loadSelectedTheme } from '@/core';
import { RootNavigator } from '@/navigation';

import { schemas } from './db/local';

loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

// Only for dev
import { reset } from './core/hooks/use-reset';
reset();

const App = () => {
  return (
    <RealmProvider schema={schemas}>
      <BottomSheetModalProvider>
        <RootNavigator />
        <FlashMessage position="top" />
      </BottomSheetModalProvider>
    </RealmProvider>
  );
};

export default App;
