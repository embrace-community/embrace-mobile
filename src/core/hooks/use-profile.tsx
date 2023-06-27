import { Realm, useRealm } from '@realm/react';
import { useCallback } from 'react';

const useProfile = () => {
  const realmDb = useRealm();

  const save = useCallback(
    async (profile: any) => {
      const newProfile = {
        _id: new Realm.BSON.ObjectId(),
        ...profile,
      };

      realmDb.write(() => {
        const createdProfile = realmDb.create('Profile', newProfile);
        console.log('Profile created', createdProfile);
      });
    },
    [realmDb]
  );

  return { save };
};

export default useProfile;
