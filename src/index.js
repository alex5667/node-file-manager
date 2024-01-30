import readline from "readline";
import { printConsole } from "./utils/printConsole.js";
import { messages } from "./constants.js";
import { consoleColors } from "./constants.js";
import { chdir } from "process";
import { homedir } from "os";

import { nwd } from "./commands/nwd.js";
import { fsOperations } from "./commands/fsOperations.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.on("line", async (input) => {
  await handleCommand(input);
  rl.prompt();
});
rl.on("close", () => {
  printConsole(messages.goodbye, consoleColors.blue);
  process.exit(0);
});

chdir(homedir());

async function handleCommand(line) {
  const [command, ...args] = line.split(" ");
  if (command === ".exit") {
    rl.close();
  }
  const availableCommands = {
    ...nwd,
    ...fsOperations,
  };

  const currentCommand = availableCommands[command];
  if (currentCommand) {
    await currentCommand(args);
  } else {
    printConsole(messages.invalidCommand, consoleColors.red);
  }
}

printConsole(messages.welcome, consoleColors.green);
printConsole(messages.currentDir(), consoleColors.green);
printConsole(messages.enter, consoleColors.green);
