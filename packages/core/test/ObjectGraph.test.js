import assert from "node:assert";
import { describe, test } from "node:test";
import object from "./fixtures/object.js";

describe("ObjectGraph", () => {
  test("can get the keys of the graph", async () => {
    assert.deepEqual(
      [...(await object.keys())],
      ["Alice.md", "Bob.md", "Carol.md"]
    );
  });

  test("can get the value for a key", async () => {
    const alice = await object.get("Alice.md");
    assert.equal(alice, "Hello, **Alice**.");
  });

  test("getting an unsupported key returns undefined", async () => {
    assert.equal(await object.get("xyz"), undefined);
  });
});
