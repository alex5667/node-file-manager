import { chdir } from "process";
import { cwd } from "process";
import { consoleColors, messages } from "../constants.js";
import path from "path";
import fs from "fs/promises";
import { printConsole } from "../utils/printConsole.js";

export const nwd = {
  up: () => {
    chdir(path.resolve(cwd(), ".."));
    printConsole(messages.currentDir());
  },

  cd: async (pathToDirectory) => {
    if (pathToDirectory.length !== 1) {
      printConsole(messages.invalidCommand);
    } else {
      try {
        const newPath = path.resolve(cwd(), pathToDirectory.join(" "));
        const stats = await fs.stat(newPath);
        if (stats.isFile()) {
          throw new Error(`Unable to set the current directory to a file.`);
        }
        chdir(newPath);
        printConsole(messages.currentDir());
      } catch {
        printConsole(messages.operationFailed);
      }
    }
  },

  ls: async () => {
    const files = await fs.readdir(cwd());

    const table = await Promise.all(
      files.map(async (file, index) => {
        const filePath = path.join(cwd(), file);
        const stats = await fs.stat(filePath);

        const type = stats.isDirectory() ? "Directory" : "File";
        return {  Name: file, Type: type };
      })
    );

    console.table(table, [ "Name", "Type"]);
  },
};
