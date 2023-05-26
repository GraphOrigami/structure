import assert from "node:assert";
import test from "node:test";
import object from "./fixtures/object.js";

test("asyncIterator returns the entries", async () => {
  const entries = [];
  for await (const entry of object) {
    entries.push(entry);
  }
  assert.deepEqual(entries, [
    ["Alice.md", "Hello, **Alice**."],
    ["Bob.md", "Hello, **Bob**."],
    ["Carol.md", "Hello, **Carol**."],
  ]);
});
