import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useActiveAccount } from '@/core';
import { Text, View } from '@/ui';

type Props = {
  profile: any;
};

export default function AccountCard({ profile }: Props) {
  const { navigate } = useNavigation();
  const [_, setActiveAccount] = useActiveAccount();

  return (
    <TouchableOpacity
      onPress={async () => {
        setActiveAccount(profile._id);
        navigate('Account', {
          screen: 'Home',
          params: {
            accountNumber: profile._id,
          },
        });
      }}
    >
      <View className="h-20 flex-row items-center justify-center border-b-[1px] border-slate-200 bg-white">
        <View className="mx-6 h-28 items-center justify-center rounded-full text-center text-lg">
          {profile.localAvatarUri ? (
            <Image
              className="h-12 w-12 rounded-full"
              source={{
                uri: profile.localAvatarUri,
              }}
            />
          ) : (
            <View className="h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FontAwesome name="user" size={24} color={'grey'} />
            </View>
          )}
        </View>
        <View className="h-full flex-1 items-start justify-center rounded-lg p-1">
          <Text variant="md" className="text-center text-gray-600">
            {profile.displayName}
          </Text>
          <Text variant="sm" className="text-center text-gray-600">
            {profile.handle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
