import FunctionStore from "../../src/FunctionStore.js";

export default new FunctionStore(
  (key) => `Hello, ${key}!`,
  ["Alice", "Bob", "Carol"]
);
