/**
 * @typedef {import("@graphorigami/async-dictionary").AsyncDictionary} AsyncDictionary
 * @typedef {import("@graphorigami/async-dictionary").AsyncMutableDictionary} AsyncMutableDictionary
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
    const keys = [...(await dictionary.keys())];
    const promises = keys.map(async (key) => [key, await dictionary.get(key)]);
    return Promise.all(promises);
  }

  /**
   * @param {AsyncDictionary} dictionary
   * @param {Function} callbackFn
   */
  static async forEach(dictionary, callbackFn) {
    const keys = [...(await dictionary.keys())];
    const promises = keys.map(async (key) => {
      const value = await dictionary.get(key);
      return callbackFn(value, key);
    });
    await Promise.all(promises);
  }

  /**
   * @param {AsyncDictionary} dictionary
   * @param {any} key
   */
  static async has(dictionary, key) {
    const value = await dictionary.get(key);
    return value !== undefined;
  }

  /**
   * Return true if the object is an AsyncDictionary.
   *
   * @param {any} object
   * @returns {boolean}
   */
  static isAsyncDictionary(object) {
    return (
      object !== null &&
      typeof object.get === "function" &&
      typeof object.keys === "function"
    );
  }

  /**
   * Return true if the object is an AsyncMutableDictionary.
   *
   * @param {any} object
   * @returns {boolean}
   */
  static isAsyncMutableDictionary(object) {
    return this.isAsyncDictionary(object) && typeof object.set === "function";
  }

  /**
   * Return the values in the dictionary.
   *
   * @param {AsyncDictionary} dictionary
   */
  static async values(dictionary) {
    const keys = [...(await dictionary.keys())];
    const promises = keys.map(async (key) => dictionary.get(key));
    return Promise.all(promises);
  }
}
