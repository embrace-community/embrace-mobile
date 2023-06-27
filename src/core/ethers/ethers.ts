import * as ethers from 'ethers';
import { pbkdf2Sync } from 'react-native-quick-crypto';
// import { pbkdf2Sync, scrypt, scryptSync } from 'react-native-quick-crypto';

ethers.pbkdf2.register(
  (
    password: Uint8Array,
    salt: Uint8Array,
    iterations: number,
    keylen: number,
    algo: 'sha256' | 'sha512'
    // eslint-disable-next-line max-params
  ) => {
    return ethers.hexlify(pbkdf2Sync(password, salt, iterations, keylen, algo));
  }
);

// ethers.scrypt.register(
//   (
//     password: Uint8Array,
//     salt: Uint8Array,
//     N: number,
//     r: number,
//     p: number,
//     keylen: number,
//     progressCallback: any
//     // eslint-disable-next-line max-params
//   ): Promise<string> => {
//     console.log(
//       'scrypt',
//       password,
//       salt,
//       { N, r, p },
//       keylen,
//       progressCallback
//     );
//     console.log(progressCallback);
//     return ethers.scrypt(password, salt, { N, r, p }, keylen);
//   }
// );

// ethers.scryptSync.register(
//   (
//     password: Uint8Array,
//     salt: Uint8Array,
//     N: number,
//     r: number,
//     p: number,
//     keylen: number
//     // eslint-disable-next-line max-params
//   ): ethers.BytesLike => {
//     return ethers.hexlify(
//       ethers.scryptSync(password, salt, { N, r, p }, keylen)
//     );
//   }
// );

export * from 'ethers';
