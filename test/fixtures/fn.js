import AsyncKVFunction from "../../src/AsyncKVFunction.js";

export default new AsyncKVFunction(
  (key) => {
    if (key.endsWith(".md")) {
      const name = key.slice(0, -3);
      return `Hello, **${name}**.`;
    }
    return undefined;
  },
  ["Alice.md", "Bob.md", "Carol.md"]
);
