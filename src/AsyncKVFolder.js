import * as fs from "node:fs/promises";
import path from "node:path";
import AsyncKVStoreBase from "./AsyncKVStoreBase.js";

/**
 * @implements {AsyncKVStore}
 */
export default class FolderStore extends AsyncKVStoreBase {
  /**
   * @param {string} dirname
   */
  constructor(dirname) {
    super();
    this.dirname = path.resolve(process.cwd(), dirname);
  }

  async get(key) {
    const filePath = path.resolve(this.dirname, key);

    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT" /* File not found */) {
        return undefined;
      }
      throw error;
    }

    return stats.isDirectory()
      ? Reflect.construct(this.constructor, [filePath]) // Return subdirectory as a graph
      : fs.readFile(filePath); // Return file contents
  }

  async keys() {
    const fileNames = await fs.readdir(this.dirname);
    return fileNames[Symbol.iterator]();
  }

  async set(key, value) {
    // Where are we going to write this value?
    const destPath = path.resolve(this.dirname, key ?? "");

    if (value === undefined) {
      // Delete the file or directory.
      let stats;
      try {
        stats = await stat(destPath);
      } catch (/** @type {any} */ error) {
        if (error.code === "ENOENT" /* File not found */) {
          return this;
        }
        throw error;
      }
      if (stats?.isDirectory()) {
        // Delete directory.
        await fs.rm(destPath, { recursive: true });
      } else if (stats) {
        // Delete file.
        await fs.unlink(destPath);
      }
    }

    const isExplorable =
      typeof value?.get === "function" && typeof value?.keys === "function";

    if (isExplorable) {
      // Write out the contents of the value graph to the destination.
      const destGraph = Reflect.construct(this.constructor, [destPath]);
      for (const subKey of await value.keys()) {
        const subValue = await value.get(subKey);
        await destGraph.set(subKey, subValue);
      }
    } else {
      // Ensure this directory exists.
      await fs.mkdir(this.dirname, { recursive: true });
      // Write out the value as the contents of a file.
      await fs.writeFile(destPath, value);
    }

    return this;
  }
}

// Return the file information for the file/folder at the given path.
// If it does not exist, return undefined.
async function stat(filePath) {
  try {
    // Await the result here so that, if the file doesn't exist, the catch block
    // below will catch the exception.
    return await fs.stat(filePath);
  } catch (/** @type {any} */ error) {
    if (error.code === "ENOENT" /* File not found */) {
      return undefined;
    }
    throw error;
  }
}
