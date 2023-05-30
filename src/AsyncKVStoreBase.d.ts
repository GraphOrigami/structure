import AsyncKVDictBase from "./AsyncKVDictBase";

export default abstract class AsyncKVStoreBase extends AsyncKVDictBase implements AsyncKVStore {
  clear(): Promise<void>;
  delete(key: any): Promise<boolean>;
  abstract set(key: any, value: any): Promise<this>;
}