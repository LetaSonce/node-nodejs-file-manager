import { logMessage, validateInput, handleError } from "../utils.js";
import { chdir, cwd } from "node:process";
import { resolve, parse } from "node:path";

const handleUp = async () => {
  const currentDir = cwd();
  const parsedPath = parse(currentDir);

  // Проверка если уже в root директории
  if (parsedPath.root === currentDir) {
    logMessage("Already in root directory");
    return;
  }

  try {
    // Переход к родительской директории
    const parentDir = resolve(currentDir, "..");
    await chdir(parentDir);
    logMessage(`Moved up to: ${parentDir}`);
  } catch (err) {
    logMessage(`Operation failed: ${err.message}`);
  }
};

export default handleUp;
