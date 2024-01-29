import { chdir } from "process";
import { cwd } from "process";
import { consoleColors, messages } from "../constants.js";
import path from "path";
import fs from "fs/promises";
import { printConsole } from "../utils/printConsole.js";

export const up = () => {
  chdir(path.resolve(cwd(), ".."));
  printConsole(messages.currentDir(), consoleColors.green);
};

export const cd = async (pathToDirectory) => {
  try {
    const newPath = path.resolve(cwd(), pathToDirectory.join(" "));
    const stats = await fs.stat(newPath);
    if (stats.isFile()) {
      throw new Error(`Can't change current directory to file`);
    }
    chdir(newPath);
    printConsole(messages.currentDir(), consoleColors.green);
  } catch {
    printConsole(messages.operationFailed, consoleColors.red);
  }
};

export const ls = async () => {
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
};
