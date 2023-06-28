import React from 'react';

import { useAccount } from '@/core/hooks';
import { SafeAreaView, Text } from '@/ui';

export const Home = ({ route }) => {
  console.log('Home', route.params);

  const { accountNumber } = route.params;

  const { accountAddress } = useAccount(accountNumber);

  console.log('accountAddress', accountAddress);

  return (
    <SafeAreaView className="m-2 flex-1 items-center justify-center">
      <Text>{accountAddress}</Text>
    </SafeAreaView>
  );
};
