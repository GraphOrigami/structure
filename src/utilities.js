/**
 * This class implements utilities methods like `entries()` that can be defined
 * in terms of other methods like `keys()` and `get()`.
 */
export default class utilities {
  /**
   * @param {AsyncStore} AsyncDict
   */
  static async clear(AsyncDict) {
    // @ts-ignore
    for (const key of await AsyncDict.keys()) {
      await AsyncDict.set(key, undefined);
    }
  }

  /**
   * @param {AsyncStore} AsyncDict
   * @param {any} key
   */
  static async delete(AsyncDict, key) {
    const exists = await this.has(AsyncDict, key);
    if (exists) {
      await AsyncDict.set(key, undefined);
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param {AsyncDict} AsyncDict
   */
  static async entries(AsyncDict) {
    const result = [];
    // @ts-ignore
    for (const key of await AsyncDict.keys()) {
      const value = await AsyncDict.get(key);
      result.push([key, value]);
    }
    return result;
  }

  /**
   * @param {AsyncDict} AsyncDict
   * @param {Function} callbackFn
   */
  static async forEach(AsyncDict, callbackFn) {
    const promises = [];
    // @ts-ignore
    for (const key of await AsyncDict.keys()) {
      const promise = AsyncDict.get(key).then((value) =>
        callbackFn(value, key)
      );
      promises.push(promise);
    }
    await Promise.all(promises);
  }

  /**
   * @param {AsyncDict} AsyncDict
   */
  static async has(AsyncDict, key) {
    const value = await AsyncDict.get(key);
    return value !== undefined;
  }

  /**
   * @param {AsyncDict} AsyncDict
   */
  static async values(AsyncDict) {
    const result = [];
    // @ts-ignore
    for (const key of await AsyncDict.keys()) {
      const value = await AsyncDict.get(key);
      result.push(value);
    }
    return result;
  }
}
