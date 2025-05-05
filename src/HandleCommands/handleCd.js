import { resolve } from "node:path";
import { chdir } from "node:process";
import { logMessage, validateInput } from "../utils.js";
import printCurrentDirectory from "../printCurrentDirectory.js";

const handleCd = async (path) => {
  const inputError = validateInput({ path });
  if (inputError) return logMessage(inputError);

  try {
    const targetPath = resolve(path);
    const root = resolve("/");

    if (!targetPath.startsWith(root)) {
      return logMessage("Cannot go above root directory");
    }

    chdir(targetPath);
    printCurrentDirectory();
  } catch {
    logMessage("Operation failed - no such directory");
  }
};

export default handleCd;
