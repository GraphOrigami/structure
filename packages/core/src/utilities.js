/**
 * @typedef {import("@graphorigami/types").AsyncDictionary} AsyncDictionary
 * @typedef {import("@graphorigami/types").AsyncMutableDictionary} AsyncMutableDictionary
 */

/**
 * This class implements utilities methods like `entries()` that can be defined
 * in terms of other methods like `keys()` and `get()`.
 */
export default class utilities {
  /**
   * @param {AsyncMutableDictionary} dictionary
   */
  static async clear(dictionary) {
    // @ts-ignore
    for (const key of await dictionary.keys()) {
      await dictionary.set(key, undefined);
    }
  }

  /**
   * @param {AsyncMutableDictionary} dictionary
   * @param {any} key
   */
  static async delete(dictionary, key) {
    const exists = await this.has(dictionary, key);
    if (exists) {
      await dictionary.set(key, undefined);
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param {AsyncDictionary} dictionary
   */
  static async entries(dictionary) {
    const result = [];
    // @ts-ignore
    for (const key of await dictionary.keys()) {
      const value = await dictionary.get(key);
      result.push([key, value]);
    }
    return result;
  }

  /**
   * @param {AsyncDictionary} dictionary
   * @param {Function} callbackFn
   */
  static async forEach(dictionary, callbackFn) {
    const promises = [];
    // @ts-ignore
    for (const key of await dictionary.keys()) {
      const promise = dictionary
        .get(key)
        .then((value) => callbackFn(value, key));
      promises.push(promise);
    }
    await Promise.all(promises);
  }

  /**
   * @param {AsyncDictionary} dictionary
   */
  static async has(dictionary, key) {
    const value = await dictionary.get(key);
    return value !== undefined;
  }

  /**
   * @param {AsyncDictionary} dictionary
   */
  static async values(dictionary) {
    const result = [];
    // @ts-ignore
    for (const key of await dictionary.keys()) {
      const value = await dictionary.get(key);
      result.push(value);
    }
    return result;
  }
}
