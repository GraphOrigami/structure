import ReadStore from "./ReadStore.js";

/**
 * This serves as an abstract base class for a read/write store. JavaScript
 * doesn't have abstract classes, so this is just a regular class that throws
 * exceptions if you try to use it directly.
 *
 * This class implements methods like `clear()` that can be defined in terms
 * of other methods like `keys()` and `delete()`.
 */
// @ts-ignore
export default class ReadWriteStore extends ReadStore {
  async clear() {
    // @ts-ignore
    for (const key of await this.keys()) {
      await this.delete(key);
    }
  }

  async delete(key) {
    const exists = await this.has(key);
    if (exists) {
      await this.set(key, undefined);
    }
    return exists;
  }

  async set(key, value) {
    throw new Error("set(key, value) method not yet implemented");
  }
}
