/**
 * This serves as an abstract base class for a readable store. JavaScript doesn't
 * have abstract classes, so this is just a regular class that throws exceptions
 * if you try to use it directly.
 *
 * This class implements methods like `entries()` that can be defined in terms
 * of other methods like `keys()` and `get()`.
 */
export default class AsyncKVDictBase {
  async *[Symbol.asyncIterator]() {
    yield* await this.entries();
  }

  async entries() {
    const result = [];
    // @ts-ignore
    for (const key of await this.keys()) {
      const value = await this.get(key);
      result.push([key, value]);
    }
    return result[Symbol.iterator]();
  }

  async forEach(callbackFn) {
    const promises = [];
    // @ts-ignore
    for (const key of await this.keys()) {
      const promise = this.get(key).then((value) => callbackFn(value, key));
      promises.push(promise);
    }
    await Promise.all(promises);
  }

  async get(key) {
    throw new Error("get(key) method not yet implemented");
  }

  async has(key) {
    const value = await this.get(key);
    return value !== undefined;
  }

  async keys() {
    throw new Error("keys() method not yet implemented");
  }

  async values() {
    const result = [];
    // @ts-ignore
    for (const key of await this.keys()) {
      const value = await this.get(key);
      result.push(value);
    }
    return result[Symbol.iterator]();
  }
}
