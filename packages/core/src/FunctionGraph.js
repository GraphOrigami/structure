/**
 * A graph defined by a function and an optional domain.
 *
 * @typedef {import("@graphorigami/async-dictionary").AsyncDictionary} AsyncDictionary
 * @implements {AsyncDictionary}
 */
export default class FunctionGraph {
  /**
   * @param {function} fn the key->value function
   * @param {Iterable<any>} [domain] optional domain of the function
   */
  constructor(fn, domain = []) {
    this.fn = fn;
    this.domain = domain;
  }

  /**
   * Return the application of the function to the given key.
   *
   * @param {any} key
   */
  async get(key) {
    let value =
      this.fn.length <= 1
        ? // Function takes no arguments or only one argument: invoke
          await this.fn(key)
        : // Bind the key to the first parameter. Subsequent get calls will
          // eventually bind all parameters until only one remains. At that point,
          // the above condition will apply and the function will be invoked.
          Reflect.construct(this.constructor, [this.fn.bind(this, key)]);
    return value;
  }

  /**
   * Enumerates the function's domain (if defined) as the graph's keys. If no domain
   * was defined, this returns an empty iterator.
   */
  async keys() {
    return this.domain;
  }
}
