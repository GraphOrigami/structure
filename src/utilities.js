/**
 * This class implements utilities methods like `entries()` that can be defined
 * in terms of other methods like `keys()` and `get()`.
 */
export default class utilities {
  /**
   * @param {AsyncKVStore} asyncKV
   */
  static async clear(asyncKV) {
    // @ts-ignore
    for (const key of await asyncKV.keys()) {
      await asyncKV.set(key, undefined);
    }
  }

  /**
   * @param {AsyncKVStore} asyncKV
   * @param {any} key
   */
  static async delete(asyncKV, key) {
    const exists = await this.has(asyncKV, key);
    if (exists) {
      await asyncKV.set(key, undefined);
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param {AsyncKVDict} asyncKV
   */
  static async entries(asyncKV) {
    const result = [];
    // @ts-ignore
    for (const key of await asyncKV.keys()) {
      const value = await asyncKV.get(key);
      result.push([key, value]);
    }
    return result;
  }

  /**
   * @param {AsyncKVDict} asyncKV
   * @param {Function} callbackFn
   */
  static async forEach(asyncKV, callbackFn) {
    const promises = [];
    // @ts-ignore
    for (const key of await asyncKV.keys()) {
      const promise = asyncKV.get(key).then((value) => callbackFn(value, key));
      promises.push(promise);
    }
    await Promise.all(promises);
  }

  /**
   * @param {AsyncKVDict} asyncKV
   */
  static async has(asyncKV, key) {
    const value = await asyncKV.get(key);
    return value !== undefined;
  }

  /**
   * @param {AsyncKVDict} asyncKV
   */
  static async values(asyncKV) {
    const result = [];
    // @ts-ignore
    for (const key of await asyncKV.keys()) {
      const value = await asyncKV.get(key);
      result.push(value);
    }
    return result;
  }
}
