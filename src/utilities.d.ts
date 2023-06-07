/// <reference path="AsyncDictionary.ts"/>

export default class utilities {
  static clear(AsyncDictionary: AsyncMutableDictionary): Promise<void>;
  static delete(AsyncDictionary: AsyncMutableDictionary, key: any): Promise<boolean>;
  static entries(AsyncDictionary: AsyncDictionary): Promise<IterableIterator<any>>;
  static forEach(AsyncDictionary: AsyncDictionary, callbackfn: (value: any, key: any) => Promise<void>): Promise<void>;
  static has(AsyncDictionary: AsyncDictionary, key: any): Promise<boolean>;
  static values(AsyncDictionary: AsyncDictionary): Promise<IterableIterator<any>>;
}