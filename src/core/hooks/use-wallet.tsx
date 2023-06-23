import { useMMKVNumber, useMMKVString } from 'react-native-mmkv';

import { HDNodeWallet, Wallet } from '@/core/ethers';

import { walletStorage, walletStorageKeys } from '../storage/wallet';

type WalletAccount = {
  address: string;
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

  const createWalletAccount = async (): Promise<WalletAccount> => {
    console.log('🚀 ~ file: use-wallet.tsx:19 ~ createWalletAccount');
    if (mnemonic === undefined) {
      // Create new wallet
      const wallet = Wallet.createRandom();
      console.log(
        '🚀 ~ file: use-wallet.tsx:24 ~ createWalletAccount ~ wallet:',
        wallet
      );

      if (wallet.mnemonic === null) {
        throw new Error('Wallet mnemonic is null');
      }

      setMnemonic(wallet.mnemonic.phrase);
      setAccountPk(wallet.privateKey);
      setAccountAddress(wallet.address);
      setNumCreatedAccounts(1);
      setActiveAccount(1);

      return {
        address: wallet.address,
      };
    } else {
      // Create new account

      // Account Path always starts at 0, whereas the account number starts at 1
      const accountPath = numCreatedAccounts;
      const accountNum = numCreatedAccounts + 1;

      const wallet = HDNodeWallet.fromPhrase(
        mnemonic,
        `m/44'/60'/0'/0/${accountPath}`
      );

      console.log(
        '🚀 ~ file: use-wallet.tsx:48 ~ createWalletAccount ~ wallet:',
        wallet,
        'accountPath',
        accountPath,
        'accountNum',
        numCreatedAccounts
      );

      setAccountPk(wallet.privateKey);
      setAccountAddress(wallet.address);
      setNumCreatedAccounts(accountNum);
      setActiveAccount(accountNum);

      return {
        address: wallet.address,
      };
    }
  };

  return {
    createWalletAccount,
  } as const;
};

const useAccount = (accountNumber: number) => {
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

export const useActiveAccount = () => {
  const [activeAccount, setActiveAccount] = useMMKVNumber(
    walletStorageKeys.ACTIVE_ACCOUNT,
    walletStorage
  );

  return [activeAccount, setActiveAccount] as const;
};

const useNumCreatedAccounts = () => {
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
