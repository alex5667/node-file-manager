import path from "path";
import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "fs";
import { cwd } from "process";
import { printConsole } from "../utils/printConsole.js";
import { messages, consoleColors } from "../constants.js";
import { pipeline } from "stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

export const compressOperations = {
  compress: async (params) => {
    if (params.length !== 2) {
      printConsole(messages.invalidCommand);
    } else {
      const filePath = path.resolve(cwd(), params[0]);
      const compressedPath = path.resolve(cwd(), params[1]);

      try {
        await fsPromises.access(filePath);
        await pipeline(
          createReadStream(filePath),
          createBrotliCompress(),
          createWriteStream(compressedPath)
        );
        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
  decompress: async (params) => {
    if (params.length !== 2) {
      printConsole(messages.invalidCommand);
    } else {
      const filePath = path.resolve(cwd(), params[0]);
      const compressedPath = path.resolve(cwd(), params[1]);

      try {
        await fsPromises.access(filePath);
        await pipeline(
          createReadStream(filePath),
          createBrotliDecompress(),
          createWriteStream(compressedPath)
        );

        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
};
