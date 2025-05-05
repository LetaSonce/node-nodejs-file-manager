import { logMessage, getPathData } from "../src/utils.js";
import printCurrentDirectory from "./printCurrentDirectory.js";
import username from "./username.js";
import readlineCommand from "./readlineCommand.js";

const errorMap = {
  ENOENT: "FS operation failed",
  EEXIST: "FS operation failed",
  ERR_FS_CP_EEXIST: "FS operation failed",
};

//const { __dirname } = getPathData(import.meta.url);

const main = async () => {
  logMessage(`Welcome to the File Manager, ${username}!`);
  await printCurrentDirectory();
  await readlineCommand();

  logMessage(`Thank you for using File Manager, ${username}, goodbye!`);
};

await main();
