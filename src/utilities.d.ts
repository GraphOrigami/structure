/// <reference path="AsyncDict.ts"/>

export default class utilities {
  static clear(AsyncDict: AsyncStore): Promise<void>;
  static delete(AsyncDict: AsyncStore, key: any): Promise<boolean>;
  static entries(AsyncDict: AsyncDict): Promise<IterableIterator<any>>;
  static forEach(AsyncDict: AsyncDict, callbackfn: (value: any, key: any) => Promise<void>): Promise<void>;
  static has(AsyncDict: AsyncDict, key: any): Promise<boolean>;
  static values(AsyncDict: AsyncDict): Promise<IterableIterator<any>>;
}