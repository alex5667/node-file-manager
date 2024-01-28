import readline from "readline";
import { EOL } from "os";
import { printConsole } from "./utils/printConsole.js";

const username = "Alex";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", (input) => {
  const command = input.trim().toLowerCase();
  // handleCommand(command);
  rl.prompt();
});

//   rl.on('line', (input) => {
//     const command = input.trim().toLowerCase();
//     handleCommand(command);
//     rl.prompt();
//   });

rl.on("close", () => {
  printConsole(
    `${EOL} Thank you for using File Manager, ${username}, goodbye!`,
    "blue"
  );
  //   console.log(`${EOL} Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

// console.log(`Welcome to the File Manager, ${username}!`);
printConsole(`Welcome to the File Manager, ${username}!`, "green");
