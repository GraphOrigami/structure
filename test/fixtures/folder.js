import path from "node:path";
import { fileURLToPath } from "node:url";
import FolderStore from "../../src/FolderStore.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const markdownPath = path.join(dirname, "markdown");

export default new FolderStore(markdownPath);
