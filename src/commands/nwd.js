import { chdir } from "process";
import { cwd } from "process";
import { consoleColors, messages } from "../constants.js";
import path from "path";
import fs from "fs/promises";
import { printConsole } from "../utils/printConsole.js";

export const nwd = {
  up: () => {
    chdir(path.resolve(cwd(), ".."));
    printConsole(messages.currentDir(), consoleColors.green);
  },

  cd: async (pathToDirectory) => {
    if (pathToDirectory.length !== 1) {
      printConsole(messages.invalidCommand, consoleColors.red);
    } else {
      try {
        const newPath = path.resolve(cwd(), pathToDirectory.join(" "));
        const stats = await fs.stat(newPath);
        if (stats.isFile()) {
          throw new Error(`Unable to set the current directory to a file.`);
        }
        chdir(newPath);
        printConsole(messages.currentDir(), consoleColors.green);
      } catch {
        printConsole(messages.operationFailed, consoleColors.red);
      }
    }
  },

  ls: async () => {
    const files = await fs.readdir(cwd());

    const table = files.map(async (file) => {
      const filePath = path.join(cwd(), file);
      const stats = await fs.stat(filePath);

      const type = stats.isDirectory() ? "directory" : "file";
      return { name: file, type };
    });

    printConsole("Name\t\tType", consoleColors.green);
    (await Promise.all(table)).forEach(({ name, type }) => {
      printConsole(`${name}\t\t${type === "directory" ? "Directory" : "File"}`);
    });
  },
};
