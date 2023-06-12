import GraphHelpers from "./GraphHelpers.js";
import SetDictionary from "./SetDictionary.js";

/**
 * A graph of Set objects.
 *
 * @typedef {import("@graphorigami/types").AsyncGraph} AsyncGraph
 * @implements {AsyncGraph}
 */
export default class SetGraph extends SetDictionary {
  async get(key) {
    let value = await super.get(key);
    if (GraphHelpers.isAsyncDictionary(value)) {
      value = Reflect.construct(this.constructor, [value]);
    }
    return value;
  }
}
