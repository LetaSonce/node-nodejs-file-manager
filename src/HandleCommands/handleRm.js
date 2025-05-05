import { logMessage, validateInput, handleError } from "../utils.js";
import { unlink } from "node:fs/promises";

const handleRm = async (path) => {
  const inputError = validateInput({ path });
  if (inputError) return logMessage(inputError);

  try {
    await unlink(path);
    return logMessage(`File ${path} removed`);
  } catch (err) {
    handleError(err);
  }
};

export default handleRm;
