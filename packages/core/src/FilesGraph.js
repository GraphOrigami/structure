import * as fs from "node:fs/promises";
import path from "node:path";

/**
 * A file system tree as a graph of Buffers.
 *
 * @typedef {import("@graphorigami/types").AsyncMutableGraph} AsyncMutableGraph
 * @implements {AsyncMutableGraph}
 */
export default class FilesGraph {
  /**
   * @param {string} dirname
   */
  constructor(dirname) {
    this.dirname = path.resolve(process.cwd(), dirname);
  }

  async get(key) {
    if (key === undefined) {
      // Getting undefined returns the graph itself.
      return this;
    }

    // We define get(undefined) to be the graph itself. This lets an ori command
    // like "ori folder/" with a trailing slash be equivalent to "ori folder".
    if (key === undefined) {
      return this;
    }
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

  async isKeyForSubgraph(key) {
    const filePath = path.join(this.dirname, key);
    const stats = await stat(filePath);
    return stats ? stats.isDirectory() : false;
  }

  async keys() {
    return fs.readdir(this.dirname);
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
