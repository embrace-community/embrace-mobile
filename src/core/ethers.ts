import { ethers, hexlify } from 'ethers';
import crypto from 'react-native-quick-crypto';

ethers.pbkdf2.register(
  (
    password: Uint8Array,
    salt: Uint8Array,
    iterations: number,
    keylen: number,
    algo: 'sha256' | 'sha512'
    // eslint-disable-next-line max-params
  ) => {
    return hexlify(crypto.pbkdf2Sync(password, salt, iterations, keylen, algo));
  }
);

export { ethers };
