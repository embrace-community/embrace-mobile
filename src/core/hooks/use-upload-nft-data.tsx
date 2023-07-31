import { Env } from '@env';

type URIs = {
  metadata: string;
  avatar?: string;
};

type UploadResponse = {
  status: number;
  json: URIs | null;
};

export const useUploadNftData = () => {
  const uploadNftData = async (data: FormData): Promise<UploadResponse> => {
    try {
      console.log('UPLOADING PROFILE', data, Env.API_ENDPOINT_IPFS + 'nft-ar');

      let res = await fetch(Env.API_ENDPOINT_IPFS + 'nft-ar', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      if (res.status !== 200) {
        console.log('Problem uploading metadata', res.status);
      }

      let json = await res.json();

      return {
        status: res.status,
        json: json || null,
      };
    } catch (error) {
      // Error retrieving data
      // Alert.alert('Error', error.message);
      console.log('error upload', error);
      return {
        status: 500,
        json: null,
      };
    }
  };

  return {
    uploadNftData,
  } as const;
};
