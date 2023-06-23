import { Realm } from '@realm/react';

import { Profile } from '@/db/local/profile-model';

import { Env } from '../env';
import { defaultStorage, walletStorage } from '../storage';

const reset = () => {
  // Only allow when in dev mode
  if (Env.APP_ENV === 'development') {
    // TODO: Doesn't appear to be deleting the realm file
    const realmConfig: Realm.Configuration = {
      schema: [Profile],
    };
    Realm.deleteFile(realmConfig);

    defaultStorage.clearAll();
    walletStorage.clearAll();

    console.log('Cleared all storage');
  }
};

export { reset };
