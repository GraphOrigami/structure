import ReadStore from "./ReadStore.js";

/**
 * @implements {IReadStore}
 */
export default class FunctionStore extends ReadStore {
  /**
   * @param {Function} fn
   * @param {any[]} [domain]
   */
  constructor(fn, domain = []) {
    super();
    this.fn = fn;
    this.domain = domain;
  }

  async get(key) {
    return this.fn(key);
  }

  async has(key) {
    return this.domain.includes(key);
  }

  async keys() {
    return this.domain[Symbol.iterator]();
  }
}
