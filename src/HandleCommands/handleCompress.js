import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { logMessage } from "../utils.js";

const handleCompress = async (inputPath, outputPath) => {
  try {
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    const gzip = createGzip();

    await pipeline(readStream, gzip, writeStream);

    logMessage(`File compressed successfully: ${outputPath}`);
  } catch (err) {
    logMessage(`Compression failed:, ${err.message}`);
  }
};

export default handleCompress;
