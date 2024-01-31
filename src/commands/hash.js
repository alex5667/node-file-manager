import { createHash } from "crypto";
import path from "path";
import { createReadStream, promises as fsPromises } from "fs";
import { cwd } from "process";
import { printConsole } from "../utils/printConsole.js";
import { messages, consoleColors } from "../constants.js";

export const hashOperation = {
  hash: async (params) => {
    if (params.length !== 1) {
      printConsole(messages.invalidCommand, consoleColors.red);
    } else {
      const filePath = path.resolve(cwd(), params.join(" "));

      try {
        await fsPromises.access(filePath);
        const fileStream = createReadStream(filePath);
        const hash = createHash("sha256");
        fileStream.pipe(hash);

        fileStream.on("close", () => {
          const hashResult = hash.digest("hex");
          printConsole(`SHA256 hash ${hashResult}`, consoleColors.green);
        });
      } catch (error) {
        printConsole(`Error : ${error.message}`, consoleColors.red);
        printConsole(messages.operationFailed, consoleColors.red);
      }
    }
  },
};
