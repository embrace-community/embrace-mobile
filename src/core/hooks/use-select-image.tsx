import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';

export const useSelectImage = () => {
  const [image, setImage] = useState<string | null>(null);

  const compressSizer = (size: number) => {
    const MB = size / Math.pow(1024, 2);
    if (Math.round(MB) === 0) return 1;
    if (Math.round(MB) === 1) return 0.8;
    if (Math.round(MB) < 5) return 0.1;
    if (Math.round(MB) >= 5) return 0;
  };

  const selectImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const selectedImage = result.assets[0];

        const fileInfo = await FileSystem.getInfoAsync(selectedImage.uri);

        //@ts-ignore - types are incorrect for fileInfo
        const compress = compressSizer(fileInfo.size);

        console.log('fileInfo', fileInfo);
        console.log('compress', compress);

        const compressedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 500, height: 500 } }],
          {
            compress,
            format: SaveFormat.JPEG,
          }
        );
        setImage(compressedImage.uri);

        console.log('SELECTED IMAGE', result.assets[0].uri);
        console.log('COMPRESSED IMAGE', compressedImage.uri);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return { image, selectImage } as const;
};
