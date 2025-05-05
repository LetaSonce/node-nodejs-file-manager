import { logMessage, validateInput, handleError } from "../utils.js";
import { rmdir } from "node:fs/promises";

const handleRmdir = async (name) => {
  const inputError = validateInput({ name });
  if (inputError) return logMessage(inputError);

  try {
    await rmdir(name);
    logMessage(`Directory ${name} removed successfully`);
  } catch (err) {
    handleError(err);
  }
};

export default handleRmdir;
