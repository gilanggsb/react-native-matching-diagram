import { useRef, type ReactElement } from 'react';
import {
  Pressable,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import { Circle } from '../Circle';
import { ContentWrapper } from '../ContentWrapper';
import type {
  IContentSide,
  ItemGestureEvent,
  ItemLayout,
} from '../matchDiagramType';
import styles from './styles';

type Props = {
  label?: string;
  side?: IContentSide;
  disabled?: boolean;
  children?: ReactElement;
  circleComponent?: ReactElement;
  circleStyle?: ViewStyle;
  parentContainer?: ItemLayout;
  containerStyle?: ViewStyle;
  onPress: (circleLayout: ItemGestureEvent, parentLayout: ItemLayout) => void;
};

const ItemWrapper = ({
  label,
  disabled,
  side = 'left',
  children,
  circleComponent,
  circleStyle,
  parentContainer,
  containerStyle,
  onPress,
}: Props) => {
  const circleLayoutRef = useRef<ItemLayout | null>(null);
  const containerLayoutRef = useRef<ItemLayout | null>(null);
  const contentLayoutRef = useRef<ItemLayout | null>(null);
  const isLeftSide = side === 'left';

  const handleParentLayout = (event: LayoutChangeEvent) => {
    containerLayoutRef.current = event.nativeEvent.layout;
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    contentLayoutRef.current = event.nativeEvent.layout;
  };

  const handleCircleLayout = (event: LayoutChangeEvent) => {
    circleLayoutRef.current = event.nativeEvent.layout;
  };

  const handleCirclePress = (event: GestureResponderEvent) => {
    onPress?.(event.nativeEvent, containerLayoutRef.current!);
  };

  const handleContentPress = (event: GestureResponderEvent) => {
    const leftPageX =
      (containerLayoutRef.current?.x ?? 0) +
      (containerLayoutRef.current?.width ?? 0);

    const rightPageX = (parentContainer?.width ?? 0) - leftPageX;

    onPress?.(
      {
        ...event.nativeEvent,
        pageX: isLeftSide ? leftPageX - 10 : rightPageX + 10,
      },
      containerLayoutRef.current!
    );
  };

  return (
    <Pressable
      disabled={disabled}
      style={[styles.row, containerStyle]}
      onLayout={handleParentLayout}
    >
      {label && isLeftSide && (
        <ContentWrapper
          disabled={disabled}
          onLayout={handleContentLayout}
          onPress={handleContentPress}
        >
          {children}
        </ContentWrapper>
      )}

      <Circle
        disabled={disabled}
        style={circleStyle}
        children={circleComponent}
        onLayout={handleCircleLayout}
        onPress={handleCirclePress}
      />

      {label && !isLeftSide && (
        <ContentWrapper
          disabled={disabled}
          onLayout={handleContentLayout}
          onPress={handleContentPress}
        >
          {children}
        </ContentWrapper>
      )}
    </Pressable>
  );
};

export { ItemWrapper };
