import { Pressable, View, type ViewStyle } from 'react-native';
import type { BaseContentProps } from '../matchDiagramType';
import styles from './styles';

type Props = { style?: ViewStyle } & BaseContentProps;

const Circle = ({ children, disabled, style, onLayout, onPress }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      onLayout={onLayout}
      onPress={onPress}
    >
      {children ? children : <View style={[styles.circle, style]} />}
    </Pressable>
  );
};

export { Circle };
