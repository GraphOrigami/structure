import path from "node:path";
import { fileURLToPath } from "node:url";
import FilesStore from "../../src/FilesStore.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const markdownPath = path.join(dirname, "markdown");

export default new FilesStore(markdownPath);
