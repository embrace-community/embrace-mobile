import type {
  NavigatorScreenParams,
  RouteProp as NRouteProp,
} from '@react-navigation/native';

import type { AccountParamList } from './account-navigator';
import type { OnboardingStackParamList } from './onboarding-navigator';
import type { UserStackParamList } from './user-navigator';

type CommunityParamList = {
  Page: { name: string };
  Chat: { channelId: string };
  Forum: { topicId: string };
};

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  User: NavigatorScreenParams<UserStackParamList>;
  Account: NavigatorScreenParams<AccountParamList>;
  Community: NavigatorScreenParams<CommunityParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;
