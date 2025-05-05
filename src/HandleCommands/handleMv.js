import { logMessage, validateInput, handleError } from "../utils.js";
import { rename, access, constants, stat } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

/**
 * Перемещает или переименовывает файл/директорию
 * @param {string} src - Путь к исходному файлу/директории
 * @param {string} dest - Путь назначения
 */

const handleMv = async (src, dest) => {
  const inputError = validateInput({ src, dest });
  if (inputError) return logMessage(inputError);

  try {
    // Проверяем существование исходного файла
    await access(src, constants.F_OK);

    // Получаем абсолютные пути
    const absSrc = resolve(src);
    const absDest = resolve(dest);

    // Проверяем, что не перемещаем в самого себя
    if (absSrc === absDest) {
      return logMessage("Error: Cannot move to the same location");
    }

    // Проверяем существование цели
    try {
      const destStats = await stat(dest);

      // Если цель - директория, перемещаем внутрь с сохранением имени
      if (destStats.isDirectory()) {
        const newPath = join(dest, basename(src));
        await rename(src, newPath);
        return logMessage(`Moved to ${newPath}`);
      }

      // Если цель - файл, переименовываем
      await rename(src, dest);
      return logMessage(`Renamed to ${dest}`);
    } catch (err) {
      // Если цель не существует, просто перемещаем
      if (err.code === "ENOENT") {
        await rename(src, dest);
        return logMessage(`Moved to ${dest}`);
      }
      throw err;
    }
  } catch (err) {
    handleError(err);
  }
};

export default handleMv;
