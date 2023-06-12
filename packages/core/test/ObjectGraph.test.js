import assert from "node:assert";
import { describe, test } from "node:test";
import ObjectGraph from "../src/ObjectGraph.js";

describe("ObjectGraph", () => {
  test("creates an ObjectGraph for subgraphs", async () => {
    const object = {
      a: 1,
      more: {
        b: 2,
      },
    };
    const fixture = new ObjectGraph(object);
    const more = await fixture.get("more");
    assert.equal(more.constructor, ObjectGraph);
    const b = await more.get("b");
    assert.equal(b, 2);
  });
});
