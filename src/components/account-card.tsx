import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Image, Text, View } from '@/ui';

type Props = {
  profile: any;
};

export default function AccountCard({ profile }: Props) {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={async () => {
        navigate('AccountHome', {
          params: { accountNumber: profile.accountNumber },
        });
      }}
    >
      <View className="mx-2 my-1 h-28 flex-row items-center justify-center rounded-xl border-[1px] border-slate-200 bg-white p-6">
        <View className="mr-1 h-28 w-16 items-center justify-center rounded-full text-center text-lg">
          {profile.localAvatarUri ? (
            <Image
              className="h-16 w-16 rounded-full"
              source={{
                uri: profile.localAvatarUri,
              }}
            />
          ) : (
            <View className="h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <FontAwesome name="user" size={24} color={'grey'} />
            </View>
          )}
        </View>
        <View className="h-full flex-1 items-start justify-center rounded-lg p-1">
          <Text variant="md" className="px-4 text-center text-gray-600">
            {profile.displayName}
          </Text>
          <Text variant="sm" className="px-4 text-center text-gray-600">
            {profile.handle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
