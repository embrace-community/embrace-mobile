import { FontAwesome } from '@expo/vector-icons';
import { useObject } from '@realm/react';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native';

import { Profile } from '@/db/local/profile-model';
import { Text } from '@/ui';

export const AccountHeader = ({ accountNumber }: { accountNumber: number }) => {
  const profile = useObject(Profile, accountNumber);

  console.log('profile', profile);

  return (
    <View className="flex-1 flex-row items-center justify-center gap-2">
      {profile?.localAvatarUri ? (
        <Image
          className="h-8 w-8 rounded-full"
          source={{
            uri: profile.localAvatarUri,
          }}
        />
      ) : (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-slate-100">
          <FontAwesome name="user" size={16} color={'grey'} />
        </View>
      )}
      <Text>{profile?.handle}</Text>
    </View>
  );
};
