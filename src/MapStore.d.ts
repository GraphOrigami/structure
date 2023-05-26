/// <reference path="AsyncStore.ts"/>

export default class MapStore implements ReadWriteStore {
  constructor(iterable?: Iterable<any> | null);
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
  clear(): Promise<void>;
  delete(key: any): Promise<boolean>;
  entries(): Promise<IterableIterator<any>>;
  forEach(callbackfn: (value: any, key: any) => Promise<void>): Promise<void>;
  get(key: any): Promise<any>;
  has(key: any): Promise<boolean>;
  keys(): Promise<IterableIterator<any>>;
  set(key: any, value: any): Promise<this>;
  values(): Promise<IterableIterator<any>>;
}