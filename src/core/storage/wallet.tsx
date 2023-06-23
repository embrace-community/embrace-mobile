import { MMKV } from 'react-native-mmkv';

type WalletKeys = {
  MNEMONIC: string;
  NUM_CREATED_ACCOUNTS: string;
  ACCOUNT_PK: string;
  ACCOUNT_ADDRESS: string;
  ACTIVE_ACCOUNT: string;
};

export const walletStorageKeys: WalletKeys = {
  MNEMONIC: 'MNEMONIC',
  NUM_CREATED_ACCOUNTS: 'NUM_CREATED_ACCOUNTS',
  ACCOUNT_PK: 'ACCOUNT_PK_%s',
  ACCOUNT_ADDRESS: 'ACCOUNT_ADDRESS_%s',
  ACTIVE_ACCOUNT: 'ACTIVE_ACCOUNT',
};

export const walletStorage = new MMKV({
  id: 'mmkv.wallet',
  encryptionKey: 'randomEncryptionKey', // TODO: Encrypt this
});
