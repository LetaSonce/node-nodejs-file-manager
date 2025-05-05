import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const USE_COLORS = true;
const supportColor =
  process.stdout.isTTY && process.env.TERM !== "dumb" && USE_COLORS;

const colors = {
  green: supportColor ? "\x1b[32m" : "",
  violet: supportColor ? "\x1b[35m" : "",
  red: supportColor ? "\x1b[31m" : "",
  reset: supportColor ? "\x1b[0m" : "",
};

const colorMap = {
  info: colors.green,
  important: colors.violet,
  error: colors.red,
};

export function logMessage(msg, type = "info") {
  const message = `${colorMap[type]}${msg}${colors.reset}`;
  if (type === "error") {
    throw new Error(message);
  } else {
    console.log(message);
  }
}

export function getPathData(meta) {
  const __filename = fileURLToPath(meta);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
}

export const validateInput = (args) => {
  const missingArgs = Object.entries(args)
    .filter(
      ([_, value]) => value === undefined || value === null || value === ""
    )
    .map(([name]) => name);

  return missingArgs.length ? `Missing: ${missingArgs.join(", ")}` : null;
};

export const handleError = (err) => {
  const errors = {
    ENOENT: "File doesn't exist",
    EISDIR: "Cannot overwrite directory with file",
    ENOTDIR: "Cannot overwrite file with directory",
    EXDEV: "Cannot move across devices",
    EACCES: "Permission denied",
    EBUSY: "File is busy or locked",
  };

  logMessage(`Operation failed - ${errors[err.code] || "Unknown error"}`);
};
