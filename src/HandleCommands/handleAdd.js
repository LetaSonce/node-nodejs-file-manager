import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { logMessage } from "../utils.js";

const handleAdd = async (fileName) => {
  if (!fileName) {
    return logMessage("Error: Missing file name. Usage: add <filename>");
  }

  try {
    const filePath = join(cwd(), fileName);
    await writeFile(filePath, "");
    logMessage(`Created empty file: ${fileName}`);
  } catch (err) {
    logMessage(`Error creating file: ${err.message}`);
  }
};

export default handleAdd;
