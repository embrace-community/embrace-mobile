import React from 'react';

import { Wallet } from '@/core/ethers';
import { useIsSetup } from '@/core/storage/hooks';
import { Button, SafeAreaView, Text } from '@/ui';

export const Setup = () => {
  const [_, setIsSetup] = useIsSetup();

  const createWallet = async () => {
    const start = performance.now();
    const wallet = Wallet.createRandom();
    const end = performance.now();

    console.log(`Creating a Wallet took ${end - start} ms.`);
    console.log('wallet', wallet.privateKey, wallet.address, wallet.mnemonic);

    setIsSetup(true);
  };

  console.log('Setup rendered');

  return (
    <SafeAreaView className="flex h-full flex-1 items-center justify-center">
      <Text variant="h1" className="mb-4">
        Get Started
      </Text>
      <Button
        label="Create Account"
        onPress={() => {
          createWallet();
        }}
      />
    </SafeAreaView>
  );
};
