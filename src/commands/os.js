import { EOL, cpus, homedir, userInfo, arch } from "os";
import { printConsole } from "../utils/printConsole.js";
import { messages, consoleColors } from "../constants.js";

const subOperation = {
  EOL: () => {
    printConsole([`${JSON.stringify(EOL)}`, consoleColors.green]);
  },
  cpus: () => {
    const cpuInfo = cpus().map(({ model, speed }) => ({
      model,
      speed: speed / 1000,
    }));
    const overallCPUs = cpus().length;
    printConsole([`Overall CPUs: ${overallCPUs}`, consoleColors.green]);
    printConsole([`${JSON.stringify(cpuInfo)}`, consoleColors.green]);
  },
  homedir: () => {
    printConsole([`${homedir()}`, consoleColors.green]);
  },
  username: () => {
    printConsole([`${userInfo().username}`, consoleColors.green]);
  },
  architecture: () => {
    printConsole([`${arch()}`, consoleColors.green]);
  },
};


export const osOperation = {
  os: async (params) => {
    if (params.length !== 1) {
      printConsole(messages.invalidCommand);
    }
    const subCommand = params.join(" ").trim().replace("--", "");
    try {
      subOperation[subCommand]();
    } catch {
      printConsole(messages.operationFailed);
    }

    printConsole(messages.currentDir());
  },
};
