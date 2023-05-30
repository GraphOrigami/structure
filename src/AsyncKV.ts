/**
 * Defines the core interfaces for an aysnc store.
 */

// At a minimum, a store must be readable.
interface AsyncKVDict {
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
  entries(): Promise<IterableIterator<any>>;
  forEach(callbackfn: (value: any, key: any) => Promise<void>): Promise<void>;
  get(key: any): Promise<any>;
  has(key: any): Promise<boolean>;
  keys(): Promise<IterableIterator<any>>;
  values(): Promise<IterableIterator<any>>;

  // isKeyExplorable?(key: any): Promise<boolean>;
  // traverse?(...keys: any[]): Promise<any>;
}

// A store that is both readable and writable.
interface AsyncKVStore extends AsyncKVDict {
  clear(): Promise<void>;
  delete(key: any): Promise<boolean>;
  set(key: any, value: any): Promise<this>;

  // onChange
}
