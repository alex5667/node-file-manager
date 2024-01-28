import { consoleColors } from "../constants.js";

export const printConsole = (message, color) => {
  const colorCode = color ? consoleColors[color] : consoleColors.reset;

  const consoleText = `${colorCode}${message}${consoleColors.reset}`;
  return console.log(consoleText);
};
