import { getInfoAsync } from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useCallback, useState } from 'react';

export const useSelectImage = () => {
  const [image, setImage] = useState<string | null>(null);

  const selectImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const selectedImage = result.assets[0];
        const { height, width } = selectedImage;

        console.log('selectedImage', selectedImage);

        console.log('height', height);
        console.log('width', width);

        const fileInfo = await getInfoAsync(selectedImage.uri);

        //@ts-ignore - types are incorrect for fileInfo
        const compress = compressSizer(fileInfo.size);
        const resize = calculateResize(height, width);

        console.log('fileInfo', fileInfo);
        console.log('compress', compress);
        console.log('resize', resize);

        const compressedImage = await manipulateAsync(
          selectedImage.uri,
          [{ resize }],
          {
            compress,
            format: SaveFormat.JPEG,
          }
        );
        setImage(compressedImage.uri);

        console.log('SELECTED IMAGE', result.assets[0].uri);
        console.log('COMPRESSED IMAGE', compressedImage.uri);
        const compressedFileInfo = await getInfoAsync(compressedImage.uri);

        console.log('compressedFileInfo', compressedFileInfo);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return { image, selectImage } as const;
};

const compressSizer = (size: number) => {
  const MB = size / Math.pow(1024, 2);
  if (Math.round(MB) === 0) return 1;
  if (Math.round(MB) === 1) return 0.8;
  if (Math.round(MB) < 5) return 0.4;
  if (Math.round(MB) >= 5) return 0.1;

  return 0.5;
};

const calculateResize = (height: number, width: number) => {
  let multiplier = 1;

  if (height > 4000 || width > 4000) {
    multiplier = 0.1;
  } else if (height > 3000 || width > 3000) {
    multiplier = 0.2;
  } else if (height > 2000 || width > 2000) {
    multiplier = 0.3;
  } else if (height > 1000 || width > 1000) {
    multiplier = 0.5;
  } else if (height > 500 || width > 500) {
    multiplier = 0.8;
  }

  console.log('calculateResize', { height, width, multiplier });

  return { width: width * multiplier, height: height * multiplier };
};
