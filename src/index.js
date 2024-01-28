import readline from "readline";
import { printConsole } from "./utils/printConsole.js";
import { messages } from "./constants.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", (input) => {
  const command = input.trim().toLowerCase();
  handleCommand(command);
  rl.prompt();
});
rl.on("close", () => {
  printConsole(messages.goodbye, "blue");
  printConsole(messages.currentDir);
  process.exit(0);
});

printConsole(messages.welcome, "green");
printConsole(messages.currentDir);

function handleCommand(command) {
  if (command === ".exit") {
    rl.close();
  }
}
