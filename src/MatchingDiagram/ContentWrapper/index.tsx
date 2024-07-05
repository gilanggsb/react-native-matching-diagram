import { type ReactElement } from 'react';
import {
  Pressable,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';
import type { CallBackWithParams } from '../generalType';

type Props = {
  children?: ReactElement;
  disabled?: boolean;
  onPress?: CallBackWithParams<void, GestureResponderEvent>;
  onLayout?: CallBackWithParams<void, LayoutChangeEvent>;
};

const ContentWrapper = ({ onLayout, onPress, children, disabled }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onLayout={onLayout}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

export { ContentWrapper };
