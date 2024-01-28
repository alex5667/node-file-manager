import { argv } from "process";

export const getUser = () => {
  const userArgv = argv.find((prop) => prop.includes("--username"));
  const userName = userArgv ? userArgv.split("=")[1] : "User";
  return userName;
};
