import assert from "node:assert";
import { beforeEach, describe, mock, test } from "node:test";
import SiteGraph from "../src/SiteGraph.js";

const mockHost = "https://mock";

const mockResponses = {
  "/Alice.html": {
    data: "Hello, Alice!",
  },
  "/.keys.json": {
    data: JSON.stringify(["Alice.html", "Bob.html", "Carol.html"]),
  },
};

describe("SiteGraph", () => {
  beforeEach(() => {
    mock.method(global, "fetch", mockFetch);
  });

  test("can get the keys of the graph", async () => {
    const fixture = new SiteGraph(mockHost);
    const keys = await fixture.keys();
    assert.deepEqual([...keys], ["Alice.html", "Bob.html", "Carol.html"]);
  });

  test("can get the value for a key", async () => {
    const fixture = new SiteGraph(mockHost);
    const alice = await fixture.get("Alice.html");
    assert.equal(alice, "Hello, Alice!");
  });

  test("getting an unsupported key returns undefined", async () => {
    const fixture = new SiteGraph(mockHost);
    assert.equal(await fixture.get("xyz"), undefined);
  });
});

async function mockFetch(href) {
  if (!href.startsWith(mockHost)) {
    return { status: 404 };
  }
  const path = href.slice(mockHost.length);
  const mockedResponse = mockResponses[path];
  return mockedResponse
    ? {
        // Returns a Buffer, not an ArrayBuffer
        arrayBuffer: () => Buffer.from(mockedResponse.data),
        ok: mockedResponse.ok ?? true,
        status: mockedResponse.status ?? 200,
        text: () => mockedResponse.data,
      }
    : {
        ok: false,
        status: 404,
      };
}
