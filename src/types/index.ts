import type { BinaryLike } from 'react-native-quick-crypto/lib/typescript/Utils';

declare module 'react-native-quick-crypto' {
  export function getRandomValues<T extends ArrayBufferView>(array: T): T;

  export function pbkdf2Sync(
    password: BinaryLike,
    salt: BinaryLike,
    iterations: number,
    keylen: number,
    digest?: string | undefined
  ): Buffer;

  // export function scrypt(
  //   password: BinaryLike,
  //   salt: BinaryLike,
  //   options: ScryptOptions,
  //   keylen: number,
  //   callback?: () => void
  // ): Promise<string>;

  // export function scryptSync(
  //   password: BinaryLike,
  //   salt: BinaryLike,
  //   options: ScryptOptions,
  //   keylen: number
  // ): globalThis.Buffer;
}
