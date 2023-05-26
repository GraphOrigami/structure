import ReadStore from "./ReadStore";

export default abstract class ReadWriteStore extends ReadStore implements IReadWriteStore {
  clear(): Promise<void>;
  delete(key: any): Promise<boolean>;
  abstract set(key: any, value: any): Promise<this>;
}