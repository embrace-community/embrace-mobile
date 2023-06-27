import { useMMKVNumber, useMMKVString } from 'react-native-mmkv';

import { HDNodeWallet } from '@/core/ethers';

import { walletStorage, walletStorageKeys } from '../storage/wallet';

type WalletAccount = {
  address: string | null;
  number: number;
};

export const useWallet = () => {
  const [mnemonic, setMnemonic] = useMMKVString(
    walletStorageKeys.MNEMONIC,
    walletStorage
  );
  const [numCreatedAccounts, setNumCreatedAccounts] = useNumCreatedAccounts();
  const { setAccountPk, setAccountAddress } = useAccount(
    numCreatedAccounts + 1
  );
  const [_, setActiveAccount] = useActiveAccount();
  let wallet: HDNodeWallet | null = null;
  let accountNum: number | null = null;

  const createWalletAccount = async (): Promise<WalletAccount> => {
    console.log('🚀 ~ file: use-wallet.tsx:19 ~ createWalletAccount');
    if (mnemonic === undefined) {
      // Create new wallet
      const start = performance.now();
      wallet = HDNodeWallet.createRandom();
      const end = performance.now();
      console.log('Create new wallet with mnemonic took ', end - start);

      if (wallet.mnemonic === null) {
        throw new Error('Wallet mnemonic is null');
      }

      accountNum = 1;

      setMnemonic(wallet.mnemonic.phrase);
    } else {
      // Create new account

      // Account Path always starts at 0, whereas the account number starts at 1
      const accountPath = numCreatedAccounts;
      accountNum = numCreatedAccounts + 1;
      const start = performance.now();
      wallet = HDNodeWallet.fromPhrase(
        mnemonic,
        `m/44'/60'/0'/0/${accountPath}`
      );
      const end = performance.now();
      console.log('Create new account took ', end - start);
    }

    if (wallet && accountNum) {
      setAccountPk(wallet.privateKey);
      setAccountAddress(wallet.address);
      setNumCreatedAccounts(accountNum);
      setActiveAccount(accountNum);
      return {
        address: wallet.address,
        number: accountNum,
      };
    } else {
      throw new Error('Wallet or account number is null');
    }
  };

  return {
    createWalletAccount,
  } as const;
};

export const useAccount = (accountNumber: number) => {
  const accountPkKey = getAccountPkStorageKey(accountNumber);
  const accountAddressKey = getAccountAddressStorageKey(accountNumber);

  const [accountPk, setAccountPk] = useMMKVString(accountPkKey, walletStorage);
  const [accountAddress, setAccountAddress] = useMMKVString(
    accountAddressKey,
    walletStorage
  );

  return {
    accountPk,
    accountAddress,
    setAccountPk,
    setAccountAddress,
  } as const;
};

// TODO: Is this required?
const useActiveAccount = () => {
  const [activeAccount, setActiveAccount] = useMMKVNumber(
    walletStorageKeys.ACTIVE_ACCOUNT,
    walletStorage
  );

  return [activeAccount, setActiveAccount] as const;
};

export const useNumCreatedAccounts = () => {
  const [numCreatedAccounts, setNumCreatedAccounts] = useMMKVNumber(
    walletStorageKeys.NUM_CREATED_ACCOUNTS,
    walletStorage
  );

  if (numCreatedAccounts === undefined) {
    return [0, setNumCreatedAccounts] as const;
  }

  return [numCreatedAccounts, setNumCreatedAccounts] as const;
};

const getAccountPkStorageKey = (accountNumber: number) => {
  return walletStorageKeys.ACCOUNT_PK.replace('%s', accountNumber.toString());
};

const getAccountAddressStorageKey = (accountNumber: number) => {
  return walletStorageKeys.ACCOUNT_ADDRESS.replace(
    '%s',
    accountNumber.toString()
  );
};
