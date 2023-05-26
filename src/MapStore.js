/**
 * @implements {IWriteStore}
 */
export default class MapStore {
  map;

  /**
   *
   * @param {Iterable} [iterable]
   */
  constructor(iterable) {
    this.map = new Map(iterable);
  }

  async *[Symbol.asyncIterator]() {
    const entries = await this.entries();
    yield* entries;
  }

  async clear() {
    this.map.clear();
  }

  async delete(key) {
    return this.map.delete(key);
  }

  async entries() {
    return this.map.entries();
  }

  async forEach(callbackFn) {
    const promises = [];
    this.map.forEach((value, key) => promises.push(callbackFn(value, key)));
    await Promise.all(promises);
  }

  async get(key) {
    return this.map.get(key);
  }

  async has(key) {
    return this.map.has(key);
  }

  async keys() {
    return this.map.keys();
  }

  async set(key, value) {
    this.map.set(key, value);
    return this;
  }

  async values() {
    return this.map.values();
  }
}
