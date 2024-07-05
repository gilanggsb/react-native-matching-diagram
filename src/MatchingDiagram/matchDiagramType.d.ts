import { GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import { CallBackWithParams } from './generalType';

export type ItemLayout = LayoutChangeEvent['nativeEvent']['layout'];
export type ItemGestureEvent = GestureResponderEvent['nativeEvent'];

export interface IPoint<T = any> {
  side: IContentSide;
  label?: string;
  index: number;
  x: number;
  y: number;
  item?: T;
}

export interface IMatchingDiagramData<T = any> extends T {
  label: string;
}

export type IMatchedData<T = any> = {
  connectedFrom: T;
  connectedTo: T;
};

export interface ILines {
  labelTo?: string;
  labelFrom?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type IContentSide = 'left' | 'right';

export type IRenderContentCallbackParams<T = IMatchingDiagramData<T>> = {
  isSelected?: boolean;
  data?: IMatchingDiagramData<T>;
  side?: IContentSide;
};

export type BaseContentProps = {
  children?: ReactElement;
  disabled?: boolean;
  onPress?: CallBackWithParams<void, GestureResponderEvent>;
  onLayout?: CallBackWithParams<void, LayoutChangeEvent>;
};

export type IDeleteSelectedItemParams<T = any> = {
  data?: IMatchingDiagramData<T>;
  isSelected?: boolean;
};
