import { Env } from '@env';

type CIDs = {
  metadataCid: string;
  avatarCid?: string;
};

type UploadResponse = {
  status: number;
  json: CIDs | null;
};

export const useUploadMetadata = () => {
  const uploadMetadata = async (data: FormData): Promise<UploadResponse> => {
    try {
      console.log('UPLOADING PROFILE', data, Env.API_ENDPOINT_IPFS + 'profile');

      let res = await fetch(Env.API_ENDPOINT_IPFS + 'profile', {
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
    uploadMetadata,
  } as const;
};
