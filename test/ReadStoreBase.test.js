import assert from "node:assert";
import test from "node:test";
import ObjectStore from "../src/AsyncKVObject.js";

test("asyncIterator returns the entries", async () => {
  const entries = [];
  const fixture = objectStore();
  for await (const entry of fixture) {
    entries.push(entry);
  }
  assert.deepEqual(entries, [
    ["Alice.md", "Hello, **Alice**."],
    ["Bob.md", "Hello, **Bob**."],
    ["Carol.md", "Hello, **Carol**."],
  ]);
});

test("entries returns the [key, value] pairs", async () => {
  const fixture = objectStore();
  assert.deepEqual(
    [...(await fixture.entries())],
    [
      ["Alice.md", "Hello, **Alice**."],
      ["Bob.md", "Hello, **Bob**."],
      ["Carol.md", "Hello, **Carol**."],
    ]
  );
});

test("forEach invokes a callback for each entry", async () => {
  const fixture = objectStore();
  const entries = [];
  await fixture.forEach(async (value, key) => {
    entries.push([key, value]);
  });
  assert.deepEqual(entries, [
    ["Alice.md", "Hello, **Alice**."],
    ["Bob.md", "Hello, **Bob**."],
    ["Carol.md", "Hello, **Carol**."],
  ]);
});

test("has returns true if the key exists", async () => {
  const fixture = objectStore();
  assert.equal(await fixture.has("Alice.md"), true);
  assert.equal(await fixture.has("David.md"), false);
});

test("values returns the store's values", async () => {
  const fixture = objectStore();
  assert.deepEqual(
    [...(await fixture.values())],
    ["Hello, **Alice**.", "Hello, **Bob**.", "Hello, **Carol**."]
  );
});

function objectStore() {
  return new ObjectStore({
    "Alice.md": "Hello, **Alice**.",
    "Bob.md": "Hello, **Bob**.",
    "Carol.md": "Hello, **Carol**.",
  });
}
