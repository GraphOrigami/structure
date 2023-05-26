/// <reference path="AsyncStore.ts"/>

export default abstract class ReadStoreBase implements ReadStore {
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
  entries(): Promise<IterableIterator<any>>;
  forEach(callbackfn: (value: any, key: any) => Promise<void>): Promise<void>;
  abstract get(key: any): Promise<any>;
  has(key: any): Promise<boolean>;
  abstract keys(): Promise<IterableIterator<any>>;
  values(): Promise<IterableIterator<any>>;
}