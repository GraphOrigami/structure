/**
 * A read-only asynchronous key-value dictionary
 */
interface AsyncDictionary {
  get(key: any): Promise<any>;
  keys(): Promise<Iterable<any>>;
  // isKeyExplorable?(key: any): Promise<boolean>;
  // traverse?(...keys: any[]): Promise<any>;
}

/**
 * A read-write asynchronous key-value store.
 */
interface AsyncMutableDictionary extends AsyncDictionary {
  set(key: any, value: any): Promise<this>;
  // onChange
}
