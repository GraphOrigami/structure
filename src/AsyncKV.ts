/**
 * A read-only asynchronous key-value dictionary
 */
interface AsyncKVDict {
  get(key: any): Promise<any>;
  keys(): Promise<Iterable<any>>;
  // isKeyExplorable?(key: any): Promise<boolean>;
  // traverse?(...keys: any[]): Promise<any>;
}

/**
 * A read-write asynchronous key-value store.
 */
interface AsyncKVStore extends AsyncKVDict {
  set(key: any, value: any): Promise<this>;
  // onChange
}
