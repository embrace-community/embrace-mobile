import { AntDesign } from '@expo/vector-icons';
import classNames from 'classnames';
import React from 'react';
import { Image } from 'react-native';

import { TouchableOpacity, View } from '@/ui';

export const CreateAccountSelectImage = ({ image, selectImage }) => {
  return (
    <View className="absolute left-0 top-0 z-10 h-48 w-full items-center bg-violet-200">
      <TouchableOpacity className="mt-24 flex" onPress={selectImage}>
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
  );
};
