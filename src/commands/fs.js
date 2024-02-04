import path from "path";
import fs from "fs/promises";
import { printConsole } from "../utils/printConsole.js";
import { messages } from "../constants.js";
import { createReadStream, createWriteStream } from "fs";
import { cwd } from "process";
import { EOL } from "os";
import { pipeline } from "stream/promises";

export const fsOperations = {
  cat: async (fileToPath) => {
    if (fileToPath.length !== 1) {
      printConsole(messages.invalidCommand);
    } else {
      try {
        const fileTReadPath = path.resolve(cwd(), fileToPath.join(" "));
        await fs.access(fileTReadPath);

        const fileStream = createReadStream(fileTReadPath, "utf-8");
        fileStream.pipe(process.stdout);

        fileStream.on("end", () => {
          printConsole(messages.currentDir());
        });

        fileStream.on("error", () => {
          printConsole(messages.operationFailed);
        });
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
  add: async (name) => {
    if (name.length !== 1) {
      printConsole(messages.invalidCommand);
    } else {
      try {
        const filePath = path.join(cwd(), name.join(" "));
        await fs.writeFile(filePath, "");
        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
  rn: async (params) => {
    if (params.length !== 2) {
      printConsole(messages.invalidCommand);
    } else {
      const sourcePath = params[0];
      const targetFileName = params[1];
      const sourceFilePath = path.resolve(cwd(), sourcePath);
      const directorySOurcePath = path.dirname(sourceFilePath);

      const targetFilePath = path.resolve(
        cwd(),
        directorySOurcePath,
        targetFileName
      );
      try {
        await fs.access(sourceFilePath);
        await fs.rename(sourceFilePath, targetFilePath);
        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
  cp: async (params) => {
    if (params.length !== 2) {
      printConsole(messages.invalidCommand);
    } else {
      const sourcePath = params[0];
      const targetDirectory = params[1];
      const sourceFilePath = path.resolve(cwd(), sourcePath);
      const fileName = path.basename(sourceFilePath);
      const targetFilePath = path.resolve(targetDirectory, fileName);

      try {
        await fs.access(sourceFilePath);
        await pipeline(
          createReadStream(sourceFilePath),
          createWriteStream(targetFilePath)
        );
        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
  mv: async (paths) => {
    if (paths.length !== 2) {
      printConsole(messages.invalidCommand);
    } else {
      const sourcePath = paths[0];
      const targetDirectory = paths[1];
      const sourceFilePath = path.resolve(cwd(), sourcePath);
      const fileName = path.basename(sourceFilePath);
      const targetFilePath = path.resolve(targetDirectory, fileName);

      try {
        await fs.access(sourceFilePath);
        await pipeline(
          createReadStream(sourceFilePath),
          createWriteStream(targetFilePath)
        );
        await fs.unlink(sourceFilePath);
        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
  rm: async (fileToPath) => {
    if (fileToPath.length !== 1) {
      printConsole(messages.invalidCommand);
    } else {
      const deletedFilePath = path.resolve(cwd(), fileToPath.join(" "));

      try {
        await fs.access(deletedFilePath);
        await fs.unlink(deletedFilePath);
        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },
};
