import { EOL } from "os";
import { getUser } from "./utils/getUser.js";
import { cwd } from "process";

export const username = getUser();

export const consoleColors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

export const messages = {
  welcome: `Welcome to the File Manager, ${username}!`,
  goodbye: `${EOL}Thank you for using File Manager, ${username}!`,
  enter: `Enter the commands and wait for the result`,
  currentDir: ()=>`You are currently in ${cwd()}`,
  operationFailed: "Operation failed",

};
