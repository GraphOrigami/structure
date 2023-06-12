import MapDictionary from "./MapDictionary.js";
import utilities from "./utilities.js";

/**
 * A dictionary backed by a Map.
 *
 * @typedef {import("@graphorigami/types").AsyncMutableGraph} AsyncMutableGraph
 * @implements {AsyncMutableGraph}
 */
export default class MapGraph extends MapDictionary {
  async get(key) {
    let value = await super.get(key);
    if (utilities.isAsyncDictionary(value)) {
      value = Reflect.construct(this.constructor, [value]);
    }
    return value;
  }
}
