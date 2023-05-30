import path from "node:path";
import { fileURLToPath } from "node:url";
import AsyncKVFolder from "../../src/AsyncKVFolder.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const markdownPath = path.join(dirname, "markdown");

export default new AsyncKVFolder(markdownPath);
