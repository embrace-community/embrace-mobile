import { Env } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { useUploadMetadata } from '@/core/hooks/use-upload-metadata';

import { useIsOnboarded } from '../storage';
import useProfile from './use-profile';
import { useNumCreatedAccounts, useWallet } from './use-wallet';
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
  const profile = useProfile();
  const { navigate } = useNavigation();
  const maxNumberOfAccounts = Number(Env.MAX_NUMBER_OF_ACCOUNTS);
  const [numCreatedAccounts] = useNumCreatedAccounts();

  const { createWalletAccount } = useWallet();
  const [isOnboarded, setIsOnboarded] = useIsOnboarded();

  const createAccount = async () => {
    if (!isValidForm(handle, displayName))
      return Alert.alert('Please enter a valid handle and display name');

    if (numCreatedAccounts >= maxNumberOfAccounts)
      return Alert.alert(
        'Maximum number of accounts reached',
        `You can only create ${maxNumberOfAccounts} accounts`
      );

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

      const newProfile = {
        _id: account.number,
        handle,
        displayName,
        accountAddress: account.address,
        localAvatarUri: image,
        metadataUri: cids?.metadataCid ? `ipfs://${cids.metadataCid}` : null,
        avatarUri: cids?.avatarCid ? `ipfs://${cids.avatarCid}` : null,
        tokenId: null,
      };

      await profile.save(newProfile);

      // TODO: Navigate to Account Home
      // Need to pass the account Number

      setLoading(false);

      if (!isOnboarded) {
        setIsOnboarded(true);
      }

      navigate('Account', {
        screen: 'Home',
        params: {
          accountNumber: account.number,
        },
      });
    } else {
      setLoading(false);
      Alert.alert('Error', 'There was a problem creating your profile');
    }
  };

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

const getFormData = (
  image: string | null,
  handle: string,
  displayName: string
) => {
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
