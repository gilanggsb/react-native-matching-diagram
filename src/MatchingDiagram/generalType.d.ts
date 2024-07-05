export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type VoidCallBack = () => void;
export type CallBack<T> = () => T;
export type CallBackWithParams<T, U> = (data: U) => T;
export type CallBackWith2Params<T, U, V> = (data1: U, data2: V) => T;
export type CallBackWith3Params<T, U, V, W> = (
  data1: U,
  data2: V,
  data3: W
) => T;
