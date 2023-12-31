import { Entypo } from '@expo/vector-icons';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { type PressableProps } from 'react-native';

import { colors } from '@/ui/theme';

import { renderBackdrop } from '../bottom-sheet';
import { Pressable } from '../pressable';
import { Text } from '../text';

export type Option = { label: string; value: string | number };

type OptionsProps = {
  options: Option[];
  onSelect: (option: Option) => void;
  value?: string | number;
};

function keyExtractor(item: Option) {
  return `select-item-${item.value}`;
}

export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  ({ options, onSelect, value }, ref) => {
    const height = options.length * 70 + 100;
    const snapPoints = React.useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const renderSelectItem = React.useCallback(
      ({ item }: { item: Option }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          selected={value === item.value}
          onPress={() => onSelect(item)}
          isDark={isDark}
        />
      ),
      [onSelect, value, isDark]
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: isDark ? colors.white : colors.slate[800],
        }}
        backgroundStyle={{
          backgroundColor: isDark ? colors.slate[900] : colors.white,
        }}
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
          style={{
            backgroundColor: isDark ? colors.slate[900] : colors.white,
          }}
        />
      </BottomSheetModal>
    );
  }
);

const Option = ({
  label,
  selected = false,
  isDark = false,
  ...props
}: PressableProps & {
  selected?: boolean;
  label: string;
  isDark?: boolean;
}) => {
  return (
    <Pressable
      className="flex-row items-center border-b-[1px] border-neutral-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
      {...props}
    >
      <Text variant="md" className="flex-1 dark:text-slate-100">
        {label}
      </Text>
      {selected && (
        <Entypo
          name="check"
          size={16}
          color={isDark ? colors.white : colors.black}
        />
      )}
    </Pressable>
  );
};
