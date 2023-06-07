import assert from "node:assert";
import test from "node:test";
import folder from "./fixtures/folder.js";

test("can get the keys of the graph", async () => {
  assert.deepEqual(
    [...(await folder.keys())],
    ["Alice.md", "Bob.md", "Carol.md"]
  );
});

test("can get the value for a key", async () => {
  const alice = await folder.get("Alice.md");
  assert.equal(alice, "Hello, **Alice**.");
});

test("getting an unsupported key returns undefined", async () => {
  assert.equal(await folder.get("xyz"), undefined);
});
