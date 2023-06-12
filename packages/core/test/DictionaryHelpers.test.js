import assert from "node:assert";
import { describe, test } from "node:test";
import DictionaryHelpers from "../src/DictionaryHelpers.js";
import ObjectGraph from "../src/ObjectGraph.js";

describe("DictionaryHelpers", () => {
  test("entries returns the [key, value] pairs", async () => {
    const fixture = objectStore();
    assert.deepEqual(
      [...(await DictionaryHelpers.entries(fixture))],
      [
        ["Alice.md", "Hello, **Alice**."],
        ["Bob.md", "Hello, **Bob**."],
        ["Carol.md", "Hello, **Carol**."],
      ]
    );
  });

  test("forEach invokes a callback for each entry", async () => {
    const fixture = objectStore();
    const results = {};
    await DictionaryHelpers.forEach(fixture, async (value, key) => {
      results[key] = value;
    });
    assert.deepEqual(results, {
      "Alice.md": "Hello, **Alice**.",
      "Bob.md": "Hello, **Bob**.",
      "Carol.md": "Hello, **Carol**.",
    });
  });

  test("getRealmObjectPrototype returns the object's root prototype", () => {
    const obj = new ObjectGraph({});
    const proto = DictionaryHelpers.getRealmObjectPrototype(obj);
    assert.equal(proto, Object.prototype);
  });

  test("has returns true if the key exists", async () => {
    const fixture = objectStore();
    assert.equal(await DictionaryHelpers.has(fixture, "Alice.md"), true);
    assert.equal(await DictionaryHelpers.has(fixture, "David.md"), false);
  });

  test("isAsyncDictionary returns true if the object is a dictionary", () => {
    assert.equal(DictionaryHelpers.isAsyncDictionary({}), false);
    assert.equal(DictionaryHelpers.isAsyncDictionary(objectStore()), true);
  });

  test("isAsyncMutableDictionary returns true if the object is a mutable dictionary", () => {
    assert.equal(
      DictionaryHelpers.isAsyncMutableDictionary({
        get() {},
        keys() {},
      }),
      false
    );
    assert.equal(
      DictionaryHelpers.isAsyncMutableDictionary(objectStore()),
      true
    );
  });

  test("isPlainObject returns true if the object is a plain object", () => {
    assert.equal(DictionaryHelpers.isPlainObject({}), true);
    assert.equal(DictionaryHelpers.isPlainObject(new Object()), true);
    assert.equal(DictionaryHelpers.isPlainObject(Object.create(null)), true);
    assert.equal(DictionaryHelpers.isPlainObject(new ObjectGraph({})), false);
  });

  test("values returns the store's values", async () => {
    const fixture = objectStore();
    assert.deepEqual(
      [...(await DictionaryHelpers.values(fixture))],
      ["Hello, **Alice**.", "Hello, **Bob**.", "Hello, **Carol**."]
    );
  });

  test("clear removes all values", async () => {
    const fixture = objectStore();
    await DictionaryHelpers.clear(fixture);
    assert.deepEqual([...(await DictionaryHelpers.entries(fixture))], []);
  });

  test("delete removes a value", async () => {
    const fixture = objectStore();
    await DictionaryHelpers.delete(fixture, "Alice.md");
    assert.deepEqual(
      [...(await DictionaryHelpers.entries(fixture))],
      [
        ["Bob.md", "Hello, **Bob**."],
        ["Carol.md", "Hello, **Carol**."],
      ]
    );
  });
});

function objectStore() {
  return new ObjectGraph({
    "Alice.md": "Hello, **Alice**.",
    "Bob.md": "Hello, **Bob**.",
    "Carol.md": "Hello, **Carol**.",
  });
}
