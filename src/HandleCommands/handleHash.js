import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { logMessage } from "../utils.js";

const handleHash = async (filePath) => {
  try {
    const fileData = await readFile(filePath);
    const hash = createHash("sha256").update(fileData).digest("hex");
    logMessage(`SHA-256 hash of ${filePath}:`);
    logMessage(hash);
  } catch (error) {
    logMessage("Error calculating hash:", error.message);
  }
};

export default handleHash;
