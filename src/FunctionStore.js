import ReadStoreBase from "./ReadStoreBase.js";

/**
 * @implements {ReadStore}
 */
export default class FunctionStore extends ReadStoreBase {
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
