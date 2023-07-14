import { useMMKVNumber, useMMKVString } from 'react-native-mmkv';

import { HDNodeWallet } from '@/core/ethers';

import { Env } from '../env';
import { walletStorage, walletStorageKeys } from '../storage/wallet';

type WalletAccount = {
  address: string | null;
  privateKey: string | null;
  number: number;
};

export const useWallet = () => {
  const [mnemonic, setMnemonic] = useMnemonic();

  console.log('mnemonic', mnemonic);
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

      console.log('mnemonic', wallet.mnemonic.phrase);
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
      console.log('Account Path', accountPath);
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
        privateKey: wallet.privateKey,
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
  console.log('🚀 ~ file: use-wallet.tsx useAccount', accountNumber);
  const accountPkKey = getAccountPkStorageKey(accountNumber);
  const accountAddressKey = getAccountAddressStorageKey(accountNumber);

  if (!accountPkKey || !accountAddressKey)
    throw new Error('Account PK or Address key is null');

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
export const useActiveAccount = () => {
  const [activeAccount, setActiveAccount] = useMMKVNumber(
    walletStorageKeys.ACTIVE_ACCOUNT,
    walletStorage
  );

  if (activeAccount === undefined) {
    return [0, setActiveAccount] as const;
  }

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
  try {
    return walletStorageKeys.ACCOUNT_PK.replace('%s', accountNumber.toString());
  } catch (error) {}
};

const getAccountAddressStorageKey = (accountNumber: number) => {
  try {
    return walletStorageKeys.ACCOUNT_ADDRESS.replace(
      '%s',
      accountNumber.toString()
    );
  } catch (error) {}
};

export const useMnemonic = () => {
  const devMnemonic =
    Env.APP_ENV === 'development' ? Env.DEV_MNEMONIC : undefined;

  const [mnemonic, setMnemonic] = useMMKVString(
    walletStorageKeys.MNEMONIC,
    walletStorage
  );

  // We have not setup an account and we are not in dev mode
  if (mnemonic === undefined && devMnemonic === undefined) {
    return [undefined, setMnemonic] as const;
    // We have not setup an account but we are in dev mode, so need to set the Dev Mnemonic
  } else if (mnemonic === undefined && devMnemonic !== undefined) {
    console.log('Setting dev mnemonic', devMnemonic);
    setMnemonic(devMnemonic);
    return [devMnemonic, setMnemonic] as const;
  }

  // We have setup an account and we are not in dev mode, so return the generated mnemonic
  return [mnemonic, setMnemonic] as const;
};
