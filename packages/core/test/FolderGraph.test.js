import assert from "node:assert";
import path from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import FolderGraph from "../src/FolderGraph.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

describe("FolderGraph", async () => {
  test("can get the keys of the graph", async () => {
    const fixture = createFixture("fixtures/markdown");
    assert.deepEqual(
      [...(await fixture.keys())],
      ["Alice.md", "Bob.md", "Carol.md"]
    );
  });

  test("can get the value for a key", async () => {
    const fixture = createFixture("fixtures/markdown");
    const alice = await fixture.get("Alice.md");
    assert.equal(alice, "Hello, **Alice**.");
  });

  test("getting an unsupported key returns undefined", async () => {
    const fixture = createFixture("fixtures/markdown");
    assert.equal(await fixture.get("xyz"), undefined);
  });

  test("can indicate which values are explorable", async () => {
    const fixture = createFixture("fixtures");
    assert(await fixture.isKeyForSubgraph("markdown"));
    const markdown = await fixture.get("markdown");
    assert(!(await markdown.isKeyForSubgraph("a.txt")));
  });
});

function createFixture(fixturePath) {
  return new FolderGraph(path.join(dirname, fixturePath));
}
