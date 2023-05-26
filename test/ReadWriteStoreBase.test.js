import assert from "node:assert";
import test from "node:test";
import ObjectStore from "../src/ObjectStore.js";

test("clear removes all values", async () => {
  const fixture = objectStore();
  await fixture.clear();
  assert.deepEqual([...(await fixture.entries())], []);
});

test("delete removes a value", async () => {
  const fixture = objectStore();
  await fixture.delete("Alice.md");
  assert.deepEqual(
    [...(await fixture.entries())],
    [
      ["Bob.md", "Hello, **Bob**."],
      ["Carol.md", "Hello, **Carol**."],
    ]
  );
});

function objectStore() {
  return new ObjectStore({
    "Alice.md": "Hello, **Alice**.",
    "Bob.md": "Hello, **Bob**.",
    "Carol.md": "Hello, **Carol**.",
  });
}
