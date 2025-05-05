import { logMessage, validateInput, handleError } from "../utils.js";
import { mkdir } from "node:fs/promises";

const handleMkdir = async (name) => {
  const inputError = validateInput({ name });
  if (inputError) return logMessage(inputError);

  try {
    mkdir(name);
    logMessage(`Directory ${name} created successfully`);
  } catch (err) {
    handleError(err);
  }
};

export default handleMkdir;
