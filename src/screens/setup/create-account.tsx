/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars  */
import { Env } from '@env';
import { AntDesign } from '@expo/vector-icons';
import type { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import classNames from 'classnames';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { Alert } from 'react-native';

import {
  Button,
  Image,
  Input,
  SafeAreaView,
  TouchableOpacity,
  View,
} from '@/ui';

type Props = {
  navigation: NativeStackNavigationHelpers;
};

export const CreateAccountScreen = ({ navigation }: Props) => {
  const [handle, setHandle] = useState('martinopensky');
  const [displayName, setDisplayName] = useState('Martin');
  const [image, setImage] = useState<string | null>(null);
  // TODO: Correct typing
  const [cids, setCids] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  type CID = {
    metadataUri: string;
    avatarUri?: string;
  };

  // Update local profiles once CIDs have been set
  useEffect(() => {
    async function updateLocalProfile() {
      // if (!rxDb || !cids || !handle) return;
      if (!cids || !handle) return;

      console.log('SETTING PROFILE CIDS', cids);

      const data: CID = {
        metadataUri: `ipfs://${cids.metadataCid}`,
      };

      if (cids.avatarCid) {
        data.avatarUri = `ipfs://${cids.avatarCid}`;
      }

      console.log('data', data);

      // await rxDb[LOCAL_DB_COLLECTION_MY_PROFILES].findOne(handle).update({
      //   $set: data,
      // });
    }

    updateLocalProfile();
  }, [cids, handle]);

  const initAccount = async () => {
    // Validate form - handle and display name
    if (!handle || !displayName) {
      return Alert.alert('Please enter a valid handle and display name');
    }

    console.log('initAccount');

    setLoading(true);

    // Create wallet
    // const activeAccount = await createWallet();

    // Save profile to local DB - will be synced to Polybase
    // const profile = createProfile(activeAccount);

    // Upload metadata & avatar to IPFS
    // Once CIDs have been set then they will be saved to Profile collection
    await uploadMetadata();

    setLoading(false);

    // console.log('profile', profile);

    // navigation.navigate('Main', {
    //   screen: 'Account',
    // });
  };

  const pickImage = useCallback(async () => {
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
          [],
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

  const compressSizer = (size: number) => {
    const MB = size / Math.pow(1024, 2);
    if (Math.round(MB) === 0) return 1;
    if (Math.round(MB) === 1) return 0.8;
    if (Math.round(MB) < 5) return 0.1;
    if (Math.round(MB) >= 5) return 0;
  };

  // Local validation of handle
  const validateHandle = (text: string) => {
    const handleRegex = /^[a-zA-Z0-9_]{1,15}$/;
    if (handleRegex.test(text)) {
      console.log('setHandle', text);
      setHandle(text.toLowerCase());
    }
  };

  // Upload profile metadata to IPFS
  const uploadMetadata = async () => {
    console.log('uploadMetadata');

    try {
      const data = new FormData();

      if (image) {
        data.append('image', {
          uri: image,
          type: 'image/jpg',
          name: 'image.jpg',
        } as any);
      }

      data.append('name', displayName);
      data.append('handle', handle);

      console.log('UPLOADING PROFILE', data, Env.API_ENDPOINT_IPFS + 'profile');

      let res = await fetch(Env.API_ENDPOINT_IPFS + 'profile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      let result = await res.json();

      if (res.status !== 200) {
        console.log('Problem uploading metadata', result, res.status);
        return false;
      }

      setCids(result);
      return true;
    } catch (error) {
      // Error retrieving data
      // Alert.alert('Error', error.message);
      console.log('error upload', error);
    }
  };

  // // Creating profile in local DB
  // const createProfile = async (activeAccount: ActiveAccount) => {
  //   console.log('Creating profile');

  //   // TODO: account.number will differ depending on w
  //   const profile = {
  //     account: activeAccount,
  //     handle,
  //     displayName,
  //     localAvatarUri: image,
  //   };

  //   // rxDb[LOCAL_DB_COLLECTION_MY_PROFILES].upsert(profile).catch((e) =>
  //   //   console.log('RxDB Error', e)
  //   // );

  //   return profile;
  // };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center bg-white">
        <View className="absolute left-0 top-0 z-10 h-48 w-full items-center bg-violet-200">
          <TouchableOpacity className="mt-24 flex" onPress={pickImage}>
            <View
              className={classNames({
                'h-56 w-56 items-center justify-center rounded-full bg-slate-100':
                  true,
                'border-8 border-violet-700/40': image,
              })}
            >
              {!image ? (
                <AntDesign
                  name="plus"
                  size={48}
                  color="black"
                  style={{ zIndex: 0 }} // eslint-disable-line react-native/no-inline-styles
                />
              ) : (
                <Image
                  source={{ uri: image }}
                  className="left-0 top-0 flex h-52 w-52 rounded-full"
                />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View className="w-full flex-1 gap-4 pt-96">
          <Input
            className="mx-auto w-80 rounded-lg bg-white p-4"
            placeholderTextColor="#ccc"
            placeholder="handle"
            value={handle}
            // onChangeText={validateHandle}
          />

          <Input
            className="mx-auto w-80 rounded-lg bg-white p-4"
            placeholderTextColor="#ccc"
            placeholder="display name"
            value={displayName}
            // onChangeText={setDisplayName}
          />
        </View>

        <View className="w-full flex-row gap-4 bg-white p-4">
          <Button
            className="flex-1"
            label="Back"
            variant="outline"
            onPress={() => navigation.navigate('GettingStarted')}
          />

          <Button
            className="flex-1"
            variant="primary"
            label="Create Account"
            loading={loading}
            onPress={initAccount}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
