import ReadStoreBase from "./ReadStoreBase";

export default abstract class ReadWriteStoreBase extends ReadStoreBase implements ReadWriteStore {
  clear(): Promise<void>;
  delete(key: any): Promise<boolean>;
  abstract set(key: any, value: any): Promise<this>;
}