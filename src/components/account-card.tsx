import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Image, Text, View } from '@/ui';

type Props = {
  profile: any;
};

export default function AccountCard({ profile }: Props) {
  return (
    <TouchableOpacity
      onPress={async () => {
        console.log('navigate to profile', profile);
      }}
    >
      <View className="mx-2 my-1 h-36 flex-row items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-6">
        <View className="mr-1 h-28 w-28 items-center justify-center rounded-full text-center text-lg">
          {profile.localAvatarUri ? (
            <Image
              className="h-28 w-28 rounded-full"
              source={{
                uri: profile.localAvatarUri,
              }}
            />
          ) : (
            <View className="h-28 w-28 items-center justify-center rounded-full bg-slate-100">
              <FontAwesome name="user" size={48} color={'grey'} />
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
