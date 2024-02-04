import { consoleColors } from "../constants.js";

export const printConsole = ([message, color]) => {

  const consoleText = `${color ? color : ""}${message}${consoleColors.reset}`;
  return console.log(consoleText);
};
