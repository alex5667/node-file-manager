import readline from "readline";
import { printConsole } from "./utils/printConsole.js";
import { messages } from "./constants.js";
import { consoleColors } from "./constants.js";
import { chdir } from "process";
import { homedir } from "os";
import path from "path";
import { cwd } from "process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.on("line", (input) => {
  const command = input.trim().toLowerCase();
  handleCommand(command);
  rl.prompt();
});
rl.on("close", () => {
  printConsole(messages.goodbye, consoleColors.blue);
  process.exit(0);
});

chdir(homedir());
function handleCommand(command) {
  if (command === ".exit") {
    rl.close();
  }
  if (command === "up") {
    const destination = path.resolve(cwd(), "..");
    chdir(destination);
    printConsole(messages.currentDir(), consoleColors.green);
  }
}


printConsole(messages.welcome, consoleColors.green);
printConsole(messages.currentDir(), consoleColors.green);
printConsole(messages.enter, consoleColors.green);