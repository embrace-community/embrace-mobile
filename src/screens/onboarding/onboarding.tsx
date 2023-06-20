import React from 'react';

import { ethers } from '@/core/ethers';
import { useIsFirstTime } from '@/core/hooks';
import { Button, SafeAreaView, Text, View } from '@/ui';

import { Cover } from './cover';

export const Onboarding = () => {
  const [_, setIsFirstTime] = useIsFirstTime();

  const createWallet = async () => {
    const start = performance.now();
    const wallet = ethers.Wallet.createRandom();
    const end = performance.now();

    console.log(`Creating a Wallet took ${end - start} ms.`);
    console.log('wallet', wallet.privateKey, wallet.address, wallet.mnemonic);
  };

  return (
    <View className="flex h-full items-center  justify-center">
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">
          Obytes Starter
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          The right way to build your mobile app
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">
          🚀 Production-ready{' '}
        </Text>
        <Text className="my-1 text-left text-lg">
          🥷 Developer experience + Productivity
        </Text>
        <Text className="my-1 text-left text-lg">
          🧩 Minimal code and dependencies
        </Text>
        <Text className="my-1 text-left text-lg">
          💪 well maintained third-party libraries
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
          }}
        />
        <Button
          label="CreateWallet"
          onPress={() => {
            createWallet();
          }}
        />
      </SafeAreaView>
    </View>
  );
};