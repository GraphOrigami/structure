import FunctionDictionary from "../../src/FunctionDictionary.js";

export default new FunctionDictionary(
  (key) => {
    if (key.endsWith(".md")) {
      const name = key.slice(0, -3);
      return `Hello, **${name}**.`;
    }
    return undefined;
  },
  ["Alice.md", "Bob.md", "Carol.md"]
);
