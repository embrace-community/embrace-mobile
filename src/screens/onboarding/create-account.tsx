import React from 'react';

import { CreateAccountForm } from '@/components/create-account/form';
import { SafeAreaView, View } from '@/ui';

export const CreateAccountScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center bg-white">
        <CreateAccountForm />
      </View>
    </SafeAreaView>
  );
};
