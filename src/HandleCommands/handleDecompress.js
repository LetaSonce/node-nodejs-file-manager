import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { logMessage } from "../utils.js";

const handleDecompress = async (inputPath, outputPath) => {
  try {
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    const gunzip = createGunzip();

    await pipeline(readStream, gunzip, writeStream);

    logMessage(`File decompressed successfully: ${outputPath}`);
  } catch (err) {
    logMessage(`Decompression failed: ${err.message}`);
  }
};

export default handleDecompress;
