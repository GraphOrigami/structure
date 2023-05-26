import ReadStore from "./ReadStore";

export default abstract class WriteStore extends ReadStore implements IWriteStore {
  clear(): Promise<void>;
  delete(key: any): Promise<boolean>;
  abstract set(key: any, value: any): Promise<this>;
}