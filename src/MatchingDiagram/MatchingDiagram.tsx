import { useEffect, useState, type ReactElement } from 'react';
import { View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import type { LineProps as SvgLineProps } from 'react-native-svg';
import type { CallBackWithParams } from './generalType';
import { ContentWrapper, ItemWrapper, Line } from './index';
import type {
  IContentSide,
  ILines,
  IMatchedData,
  IMatchingDiagramData,
  IPoint,
  IRenderContentCallbackParams,
  ItemGestureEvent,
  ItemLayout,
} from './matchDiagramType';
import styles from './styles';

// BACKLOG :
// 1. removeCurrentLineWhenCirclePressed
// 2. deleteSelectedItem
// 3. mapping initial item
export type MatchingDiagramProps<T = any> = {
  leftData: IMatchingDiagramData<T>[];
  rightData: IMatchingDiagramData<T>[];
  isCanSelectMultiLinePerItem?: boolean;
  clearState?: boolean;
  disabled?: boolean;
  circleComponent?: ReactElement;
  circleStyle?: ViewStyle;
  parentContainerStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
  lineStyle?: SvgLineProps;
  onOneItemMatched?: CallBackWithParams<void, IMatchedData>;
  onAllItemMatched?: CallBackWithParams<void, IMatchedData[]>;
  renderContent: CallBackWithParams<
    ReactElement,
    IRenderContentCallbackParams<IMatchingDiagramData<T>>
  >;
};

const MatchingDiagram = <T,>({
  leftData,
  rightData,
  parentContainerStyle,
  itemContainerStyle,
  lineStyle,
  isCanSelectMultiLinePerItem,
  clearState = false,
  disabled = false,
  circleComponent,
  circleStyle,
  onOneItemMatched,
  onAllItemMatched,
  renderContent,
}: MatchingDiagramProps<T>) => {
  const [lines, setLines] = useState<ILines[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<IPoint[]>([]);
  const [parentContainer, setParentContainer] = useState<ItemLayout>();
  const [matchedObject, setMatchedObject] = useState<IMatchedData[]>([]);

  const handleItemPress = (
    side: IContentSide,
    index: number,
    item: IMatchingDiagramData<T>,
    circleLayout: ItemGestureEvent,
    containerLayout: ItemLayout
  ) => {
    if (disabled) {
      return;
    }
    const { pageX: circleX } = circleLayout;
    const { height: containerHeight, y: containerY } = containerLayout;
    // const isLeftSide = side === 'left';
    const mappedCircle: IPoint = {
      index,
      label: item.label,
      side,
      x: circleX,
      y: containerY + containerHeight / 2,
      item,
    };

    // return if selectedContainer contains same label
    if (selectedContainer.some((data) => item.label === data.label)) {
      setSelectedContainer((prev) =>
        prev.filter((data) => data.label !== item.label)
      );
      return;
    }

    // return if current selected item is more than one selected
    if (!isCanSelectMultiLinePerItem) {
      if (
        matchedObject.some(
          (data) =>
            data.connectedTo.label === item.label ||
            data.connectedFrom.label === item.label
        )
      ) {
        setSelectedContainer([]);
        return;
      }
    }

    // return if selectedContainer contains same side
    if (selectedContainer.some((data) => side === data.side)) {
      setSelectedContainer([mappedCircle]);
      return;
    }

    setSelectedContainer((prev) => [...prev, mappedCircle]);
  };

  //clear line state
  useEffect(() => {
    if (!clearState) {
      return;
    }

    clearLines();
  }, [clearState]);

  // Draw Line and invoke onOneItemMatched
  useEffect(() => {
    if (selectedContainer.length !== 2) {
      return;
    }
    const leftItem = selectedContainer[0];
    const rightItem = selectedContainer[1];

    const newLine: ILines = {
      labelFrom: leftItem?.label,
      labelTo: rightItem?.label,
      x1: leftItem?.x ?? 0,
      y1: leftItem?.y ?? 0,
      y2: rightItem?.y ?? 0,
      x2: rightItem?.x ?? 0,
    };
    setLines((prev) => [...prev, newLine]);
    setSelectedContainer([]);

    const matchedData: IMatchedData = {
      connectedFrom: leftItem,
      connectedTo: rightItem,
    };

    onOneItemMatched?.(matchedData);
    setMatchedObject((prev) => [...prev, matchedData]);
  }, [onOneItemMatched, selectedContainer]);

  // invoke onAllItemMatched function
  useEffect(() => {
    if (matchedObject.length < leftData.length) {
      return;
    }

    onAllItemMatched?.(matchedObject);
  }, [leftData.length, matchedObject, onAllItemMatched]);

  const handleParentLayout = (event: LayoutChangeEvent) => {
    setParentContainer(event.nativeEvent.layout);
  };

  const clearLines = () => {
    setSelectedContainer([]);
    setLines([]);
    setMatchedObject([]);
  };

  const onLinePressed = (_: ILines) => {
    // if (!removeCurrentLineWhenCirclePressed) {
    //   return;
    // }
    // setLines(prev => prev.filter(line => line.labelTo !== currentLine.labelTo));
  };

  const renderItem = (data: IMatchingDiagramData<T>[], side: IContentSide) => {
    return data.map((item, index) => {
      const callbackData: IRenderContentCallbackParams<T> = {
        isSelected: selectedContainer.some(
          (selectedData) => selectedData.label === item.label
        ),
        data: item,
        side: side,
      };
      return (
        <ItemWrapper
          parentContainer={parentContainer}
          key={index}
          side={side}
          label={item.label}
          disabled={disabled}
          circleComponent={circleComponent}
          circleStyle={circleStyle}
          containerStyle={itemContainerStyle}
          onPress={(event, containerLayout) =>
            handleItemPress(side, index, item, event, containerLayout)
          }
        >
          {renderContent(callbackData)}
        </ItemWrapper>
      );
    });
  };

  return (
    <View
      style={[styles.container, parentContainerStyle]}
      onLayout={handleParentLayout}
    >
      <View style={styles.column}>{renderItem(leftData, 'left')}</View>
      <Line lines={lines} lineStyle={lineStyle} onPress={onLinePressed} />
      <View style={styles.column}>{renderItem(rightData, 'right')}</View>
    </View>
  );
};

MatchingDiagram.ItemWrapper = ItemWrapper;
MatchingDiagram.ContentWrapper = ContentWrapper;

export default MatchingDiagram;
