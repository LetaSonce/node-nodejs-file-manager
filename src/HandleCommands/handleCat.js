import { createReadStream } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { logMessage } from "../utils.js";

const handleCat = async (filePath) => {
  const absolutePath = join(cwd(), filePath);

  const readStream = createReadStream(absolutePath, { encoding: "utf-8" });

  readStream
    .on("data", (chunk) => {
      process.stdout.write(chunk);
    })
    .on("error", (err) => {
      logMessage(`Error reading file: ${err.message}`);
    })
    .on("end", () => {
      console.log();
    });
};

export default handleCat;
