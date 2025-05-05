import { access, constants, rename } from "node:fs/promises";
import { join, basename, dirname } from "node:path";
import { cwd } from "node:process";
import { logMessage, handleError } from "../utils.js";

const handleRn = async (oldPath, newName) => {
  if (!oldPath || !newName) {
    return logMessage("Error: Missing arguments. Usage: rn <path> <new_name>");
  }

  try {
    const absoluteOldPath = join(cwd(), oldPath);
    const directory = dirname(absoluteOldPath);
    const absoluteNewPath = join(directory, newName);

    // Проверяем, если файл существует
    await access(absoluteOldPath, constants.F_OK);

    // Проверяем, если существует ли папка назначения
    try {
      await access(absoluteNewPath, constants.F_OK);
      return logMessage(`Error: ${newName} already exists`);
    } catch {}

    await rename(absoluteOldPath, absoluteNewPath);
    logMessage(`Renamed: ${basename(oldPath)} → ${newName}`);
  } catch (err) {
    logMessage(`Error: ${handleError[err.code] || err.message}`);
  }
};

export default handleRn;
