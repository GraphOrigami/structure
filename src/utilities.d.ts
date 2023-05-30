/// <reference path="AsyncKV.ts"/>

export default class utilities {
  static clear(asyncKV: AsyncKVStore): Promise<void>;
  static delete(asyncKV: AsyncKVStore, key: any): Promise<boolean>;
  static entries(asyncKV: AsyncKVDict): Promise<IterableIterator<any>>;
  static forEach(asyncKV: AsyncKVDict, callbackfn: (value: any, key: any) => Promise<void>): Promise<void>;
  static has(asyncKV: AsyncKVDict, key: any): Promise<boolean>;
  static values(asyncKV: AsyncKVDict): Promise<IterableIterator<any>>;
}