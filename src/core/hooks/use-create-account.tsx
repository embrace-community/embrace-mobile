import { Env } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { useIsOnboarded } from '../storage';
import useProfile from './use-profile';
import { useUploadNftData } from './use-upload-nft-data';
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
  const { uploadNftData } = useUploadNftData();
  // const { uploadBundlr } = useUploadBundlr();
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

    // 1 - Create Wallet Account
    const account = await createWalletAccount();

    // 2 - Upload metadata & avatar to IPFS/Arweave
    const data = getFormData(image, handle, displayName);

    const result = await uploadNftData(data);

    // 3 - Save data to local DB
    if (result.status === 200) {
      const uris = result.json;

      console.log('createdAccount', account);

      console.log('uris', uris);

      const newProfile = {
        _id: account.number,
        handle,
        displayName,
        accountAddress: account.address,
        localAvatarUri: image,
        metadataUri: uris?.metadata ? `${uris.metadata}` : null,
        avatarUri: uris?.avatar ? `${uris.avatar}` : null,
        tokenId: null,
      };

      await profile.save(newProfile);

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
    data.append('asset', {
      uri: image,
      type: 'image/jpg',
      name: 'image.jpg',
    } as any);
  }

  data.append('name', displayName);
  data.append('handle', handle);

  return data;
};
