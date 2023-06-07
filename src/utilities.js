/**
 * This class implements utilities methods like `entries()` that can be defined
 * in terms of other methods like `keys()` and `get()`.
 */
export default class utilities {
  /**
   * @param {AsyncMutableDictionary} AsyncDictionary
   */
  static async clear(AsyncDictionary) {
    // @ts-ignore
    for (const key of await AsyncDictionary.keys()) {
      await AsyncDictionary.set(key, undefined);
    }
  }

  /**
   * @param {AsyncMutableDictionary} AsyncDictionary
   * @param {any} key
   */
  static async delete(AsyncDictionary, key) {
    const exists = await this.has(AsyncDictionary, key);
    if (exists) {
      await AsyncDictionary.set(key, undefined);
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param {AsyncDictionary} AsyncDictionary
   */
  static async entries(AsyncDictionary) {
    const result = [];
    // @ts-ignore
    for (const key of await AsyncDictionary.keys()) {
      const value = await AsyncDictionary.get(key);
      result.push([key, value]);
    }
    return result;
  }

  /**
   * @param {AsyncDictionary} AsyncDictionary
   * @param {Function} callbackFn
   */
  static async forEach(AsyncDictionary, callbackFn) {
    const promises = [];
    // @ts-ignore
    for (const key of await AsyncDictionary.keys()) {
      const promise = AsyncDictionary.get(key).then((value) =>
        callbackFn(value, key)
      );
      promises.push(promise);
    }
    await Promise.all(promises);
  }

  /**
   * @param {AsyncDictionary} AsyncDictionary
   */
  static async has(AsyncDictionary, key) {
    const value = await AsyncDictionary.get(key);
    return value !== undefined;
  }

  /**
   * @param {AsyncDictionary} AsyncDictionary
   */
  static async values(AsyncDictionary) {
    const result = [];
    // @ts-ignore
    for (const key of await AsyncDictionary.keys()) {
      const value = await AsyncDictionary.get(key);
      result.push(value);
    }
    return result;
  }
}
