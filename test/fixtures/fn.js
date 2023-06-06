import FunctionDict from "../../src/FunctionDict.js";

export default new FunctionDict(
  (key) => {
    if (key.endsWith(".md")) {
      const name = key.slice(0, -3);
      return `Hello, **${name}**.`;
    }
    return undefined;
  },
  ["Alice.md", "Bob.md", "Carol.md"]
);
