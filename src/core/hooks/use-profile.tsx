import { useQuery, useRealm } from '@realm/react';
import { useCallback } from 'react';

import { Profile } from '@/db/local/profile-model';

const useProfile = () => {
  const realmDb = useRealm();
  const profiles = useQuery(Profile);

  const save = useCallback(
    async (profile: any) => {
      const newProfile = {
        ...profile,
      };

      realmDb.write(() => {
        const createdProfile = realmDb.create('Profile', newProfile);
        console.log('Profile created', createdProfile);
      });
    },
    [realmDb]
  );

  return { save, profiles };
};

export default useProfile;
