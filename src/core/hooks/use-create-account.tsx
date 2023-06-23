import { Realm, useRealm } from '@realm/react';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useUploadMetadata } from '@/core/hooks/use-upload-metadata';

import { useIsOnboarded } from '../storage';
import { useWallet } from './use-wallet';

type Props = {
  handle: string;
  displayName: string;
  setLoading: (loading: boolean) => void;
  image: string | null;
};

export const useCreateAccountForm = ({
  displayName,
  handle,
  image,
  setLoading,
}: Props) => {
  const { uploadMetadata } = useUploadMetadata();
  // const { profile } = useProfile();
  const realmDb = useRealm();
  const { createWalletAccount } = useWallet();
  const [_, setIsOnboarded] = useIsOnboarded();

  const createAccount = useCallback(async () => {
    if (!isValidForm(handle, displayName))
      return Alert.alert('Please enter a valid handle and display name');

    setLoading(true);

    // 1 - Create Account
    const account = await createWalletAccount();

    // 2 - Upload metadata & avatar to IPFS
    const data = getFormData(image, handle, displayName);
    const result = await uploadMetadata(data);

    // 3 - Save data to local DB
    if (result.status === 200) {
      const cids = result.json;

      console.log('cids', cids);

      // TODO: Save to local DB
      realmDb.write(() => {
        const profile = {
          _id: new Realm.BSON.ObjectId(),
          handle,
          displayName,
          accountAddress: account.address,
          localAvatarUri: image,
          metadataUri: cids?.metadataCid ? `ipfs://${cids.metadataCid}` : null,
          avatarUri: cids?.avatarCid ? `ipfs://${cids.avatarCid}` : null,
          tokenId: null,
        };
        console.log('Profile created', profile);
        const create = realmDb.create('Profile', profile);

        console.log('Profile created', create);
      });

      setLoading(false);
      setIsOnboarded(true);
    } else {
      setLoading(false);
      Alert.alert('Error', 'There was a problem creating your profile');
    }
  }, [
    handle,
    displayName,
    setLoading,
    uploadMetadata,
    image,
    createWalletAccount,
    setIsOnboarded,
    realmDb,
  ]);

  return {
    createAccount,
  } as const;
};

const isValidForm = (handle: string, displayName: string): boolean => {
  // Validate form - handle and display name
  if (!handle || !displayName) {
    return false;
  }

  return true;
};

const getFormData = (image, handle, displayName) => {
  const data = new FormData();

  if (image) {
    data.append('image', {
      uri: image,
      type: 'image/jpg',
      name: 'image.jpg',
    } as any);
  }

  data.append('name', displayName);
  data.append('handle', handle);

  return data;
};
