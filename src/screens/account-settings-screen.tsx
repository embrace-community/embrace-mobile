import { Env } from '@env';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import * as React from 'react';

import { translate } from '@/core';
import { ScrollView, Text, View } from '@/ui';
import colors from '@/ui/theme/colors';

import { Item } from '../components/item';
import { ItemsContainer } from '../components/items-container';
import { LanguageItem } from '../components/language-item';
import { ThemeItem } from '../components/theme-item';

export const Settings = () => {
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <ScrollView>
      <View className="flex-1 px-4 pt-16 ">
        <Text variant="lg" className="font-bold">
          {translate('settings.title')}
        </Text>
        <ItemsContainer title="settings.general">
          <LanguageItem />
          <ThemeItem />
        </ItemsContainer>

        <ItemsContainer title="settings.about">
          <Item text="settings.app_name" value={Env.NAME} />
          <Item text="settings.version" value={Env.VERSION} />
        </ItemsContainer>

        <ItemsContainer title="settings.support_us">
          <Item
            text="settings.share"
            icon={<Ionicons name="share-outline" size={24} color={iconColor} />}
            onPress={() => {}}
          />
          <Item
            text="settings.rate"
            icon={
              <MaterialCommunityIcons
                name="star-outline"
                size={24}
                color={iconColor}
              />
            }
            onPress={() => {}}
          />
          <Item
            text="settings.support"
            icon={<Ionicons name="heart-outline" size={24} color={iconColor} />}
            onPress={() => {}}
          />
        </ItemsContainer>

        <ItemsContainer title="settings.links">
          <Item text="settings.privacy" onPress={() => {}} />
          <Item text="settings.terms" onPress={() => {}} />

          <Item
            text="settings.website"
            icon={
              <MaterialCommunityIcons name="web" size={24} color={iconColor} />
            }
            onPress={() => {}}
          />
        </ItemsContainer>
      </View>
    </ScrollView>
  );
};
