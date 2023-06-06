import path from "node:path";
import { fileURLToPath } from "node:url";
import FolderDict from "../../src/FolderDict.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const markdownPath = path.join(dirname, "markdown");

export default new FolderDict(markdownPath);
