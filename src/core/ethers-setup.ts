import crypto from 'react-native-quick-crypto';
global.getRandomValues = crypto.getRandomValues;

export * from '@ethersproject/shims';
