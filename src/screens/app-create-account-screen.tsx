import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { CreateAccountSelectImage } from '@/components/select-image';
import { useCreateAccountForm, useIsOnboarded, useSelectImage } from '@/core';
import { Button, Input, SafeAreaView, View } from '@/ui';

export const CreateAccountScreen = () => {
  const [isOnboarded] = useIsOnboarded();
  const [handle, setHandle] = useState<string>('martinopensky');
  const [displayName, setDisplayName] = useState<string>('Martin');
  const [loading, setLoading] = useState<boolean>(false);

  const { navigate } = useNavigation();
  const { image, selectImage } = useSelectImage();

  const { createAccount } = useCreateAccountForm({
    handle,
    displayName,
    setLoading,
    image,
  });

  const back = () => {
    if (!isOnboarded) {
      navigate('Onboarding', {
        screen: 'GettingStarted',
      });
    } else {
      navigate('App', {
        screen: 'Accounts',
      });
    }
  };

  // Local validation of handle
  const validateHandle = (text: string) => {
    const handleRegex = /^[a-zA-Z0-9_]{1,15}$/;
    if (handleRegex.test(text)) {
      console.log('setHandle', text);
      setHandle(text.toLowerCase());
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center bg-white">
        <CreateAccountSelectImage image={image} selectImage={selectImage} />
        <View className="w-full flex-1 px-4 pt-[360px]">
          <Input
            className="mx-auto w-80 rounded-lg bg-white p-4"
            placeholderTextColor="#ccc"
            placeholder="handle"
            value={handle}
            onChangeText={validateHandle}
          />

          <Input
            className="mx-auto w-80 rounded-lg bg-white p-4"
            placeholderTextColor="#ccc"
            placeholder="display name"
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>

        <View className="w-full flex-row gap-4 bg-white p-4">
          <Button
            className="flex-1"
            label="Back"
            variant="outline"
            onPress={() => back()}
          />

          <Button
            className="flex-1"
            variant="primary"
            label="Create Account"
            loading={loading}
            onPress={createAccount}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
