import { consoleColors } from "../constants.js";

export const printConsole = (message, color) => {
  const colorCode = consoleColors[color];

  const consoleText = `${colorCode}${message}${consoleColors.reset}`;
  return console.log(consoleText);
};
