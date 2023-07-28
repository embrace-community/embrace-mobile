import Bundlr from '@bundlr-network/client';
import type { UploadResponse } from '@bundlr-network/client/build/cjs/common/types';

export const useUploadBundlr = () => {
  const uploadBundlr = async (
    data: FormData,
    privateKey: string
  ): Promise<UploadResponse | any> => {
    try {
      const bundlr = new Bundlr(
        'http://node1.bundlr.network',
        'matic',
        privateKey
      );
      await bundlr.ready();

      const tx = await bundlr.upload('TEST bla bla', {
        tags: [{ name: 'Content-Type', value: 'image/png' }],
      });

      console.log('tx', tx);

      return tx;
    } catch (error) {
      return error;
    }
  };

  return {
    uploadBundlr,
  } as const;
};
