import { logMessage, validateInput, handleError } from "../utils.js";
import { copyFile, access, constants, stat } from "node:fs/promises";
import { join, basename } from "node:path";

const handleCp = async (src, dest) => {
  const inputError = validateInput({ src, dest });
  if (inputError) return logMessage(inputError);

  try {
    // проверяем исходный файл
    await access(src, constants.F_OK);

    // если dest директория
    try {
      const destStats = await stat(dest);
      if (destStats.isDirectory()) {
        const newPath = join(dest, basename(src));
        await copyFile(src, newPath);
        return logMessage(`File copied to ${newPath}`);
      }
    } catch {
      logMessage("Dest does not exist");
    }
    await copyFile(src, dest);
    logMessage(`File copied to ${dest}`);
  } catch (err) {
    handleError(err);
  }
};

export default handleCp;
