import readline from "readline";
import { printConsole } from "./utils/printConsole.js";
import { messages } from "./constants.js";
import { consoleColors } from "./constants.js";
import { chdir } from "process";
import { homedir } from "os";
import { cd } from "./commands/nwd.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.on("line", (input) => {
  handleCommand(input);
  rl.prompt();
});
rl.on("close", () => {
  printConsole(messages.goodbye, consoleColors.blue);
  process.exit(0);
});

chdir(homedir());

function handleCommand(line) {
  const [command, ...args] = line.split(" ");
  console.log("command", command)
  console.log("args", args)
  if (command === ".exit") {
    rl.close();

  }
  if (command === "cd") {
    cd(args);
  }
}

printConsole(messages.welcome, consoleColors.green);
printConsole(messages.currentDir(), consoleColors.green);
printConsole(messages.enter, consoleColors.green);
