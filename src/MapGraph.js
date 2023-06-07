/**
 * @implements {AsyncMutableDictionary}
 */
export default class MapGraph {
  map;

  /**
   * @param {Iterable} [iterable]
   */
  constructor(iterable) {
    this.map = new Map(iterable);
  }

  async get(key) {
    return this.map.get(key);
  }

  async keys() {
    return this.map.keys();
  }

  async set(key, value) {
    this.map.set(key, value);
    return this;
  }
}
