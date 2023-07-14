import { Entypo, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from 'nativewind';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';

import { AccountHeader } from '@/components/account-header-title';
import { useActiveAccount } from '@/core';
import { Home, Settings, Style } from '@/screens';
import { colors, Pressable } from '@/ui';

export type AccountParamList = {
  Home: { accountNumber: number };
  Style: undefined;
  Settings: undefined;
};

type TabType = {
  name: keyof AccountParamList;
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof AccountParamList]: (props: SvgProps) => JSX.Element;
};

const Tab = createBottomTabNavigator<AccountParamList>();

const tabsIcons: TabIconsType = {
  Home: (props: SvgProps) => <Entypo name="home" size={24} {...props} />,
  Style: (props: SvgProps) => <Entypo name="palette" size={24} {...props} />,
  Settings: (props: SvgProps) => <Entypo name="cog" size={24} {...props} />,
};

export type TabList<T extends keyof AccountParamList> = {
  navigation: NativeStackNavigationProp<AccountParamList, T>;
  route: RouteProp<AccountParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'Home',
    component: Home,
    label: 'Home',
  },
  {
    name: 'Style',
    component: Style,
    label: 'Style',
  },
  {
    name: 'Settings',
    component: Settings,
    label: 'Settings',
  },
];

type BarIconType = {
  name: keyof AccountParamList;
  color: string;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  const Icon = tabsIcons[name];
  return <Icon color={color} {...reset} />;
};

export const AccountNavigator = () => {
  const { navigate } = useNavigation();
  const [activeAccount] = useActiveAccount();

  const { colorScheme } = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor:
          colorScheme === 'dark' ? colors.slate[400] : colors.neutral[400],
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color }) => <BarIcon name={route.name} color={color} />,
        headerShown: false,
        tabBarShowLabel: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <Pressable
            onPress={() => navigate('App', { screen: 'Accounts' })}
            className="ml-2 p-2"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
        ),
      })}
    >
      <Tab.Group
        screenOptions={() => ({
          headerShown: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => <AccountHeader accountNumber={activeAccount} />,
        })}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};
