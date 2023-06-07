import assert from "node:assert";
import test from "node:test";
import fn from "./fixtures/fn.js";

test("can get the keys of the graph", async () => {
  assert.deepEqual([...(await fn.keys())], ["Alice.md", "Bob.md", "Carol.md"]);
});

test("can get the value for a key", async () => {
  const alice = await fn.get("Alice.md");
  assert.equal(alice, "Hello, **Alice**.");
});

test("getting an unsupported key returns undefined", async () => {
  assert.equal(await fn.get("xyz"), undefined);
});
