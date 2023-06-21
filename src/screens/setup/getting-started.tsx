import type { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';

import { Button, Image, SafeAreaView, Text, View } from '@/ui';

const logo = require('../../../assets/logo.png');

type Props = {
  navigation: NativeStackNavigationHelpers;
};

export const GettingStartedScreen = ({ navigation }: Props) => {
  // const { navigate } = useNavigation();
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center gap-3 bg-violet-100">
      <Image source={logo} className="h-48 w-48" />

      <Text className="text-center text-2xl font-bold text-gray-800">
        Embrace Community
      </Text>
      <Text className="text-center text-xl font-bold text-gray-800">
        Your Platform, Your Community
      </Text>
      <Text className="mb-8 hidden px-12 text-center text-lg text-gray-800">
        Enabling you to take ownership of your content & connect directly with
        your community.
      </Text>
      <Text className="mb-8 px-12 text-center text-lg text-gray-800">
        Empowering Creators to build their own communities.
      </Text>

      <View>
        <Button
          label="Get Started"
          onPress={() => {
            navigation.navigate('CreateAccount');
          }}
        >
          <Text className="text-white">Get Started</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};
