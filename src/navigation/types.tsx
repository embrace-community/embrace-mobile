import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { OnboardingStackParamList } from './onboarding-navigator';
import type { UserStackParamList } from './user-navigator';

export type RootStackParamList = OnboardingStackParamList & UserStackParamList; //  & FooStackParamList & BarStackParamList
// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;
