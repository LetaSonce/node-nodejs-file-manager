import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";
import printCurrentDirectory from "./printCurrentDirectory.js";
import handleLs from "./HandleCommands/handleLs.js";
import handleCat from "./HandleCommands/handleCat.js";
import handleAdd from "./HandleCommands/handleAdd.js";
import handleCd from "./HandleCommands/handleCd.js";
import handleCp from "./HandleCommands/handleCp.js";
import handleMv from "./HandleCommands/handleMv.js";
import handleRn from "./HandleCommands/handleRn.js";
import handleRm from "./HandleCommands/handleRm.js";
import handleMkdir from "./HandleCommands/handleMkdir.js";
import handleRmdir from "./HandleCommands/handleRmdir.js";
import handleUp from "./HandleCommands/handleUp.js";
import handleOs from "./HandleCommands/handleOs.js";
import handleHash from "./HandleCommands/handleHash.js";
import handleCompress from "./HandleCommands/handleCompress.js";
import handleDecompress from "./HandleCommands/handleDecompress.js";
import { logMessage } from "./utils.js";

const readlineCommand = async () => {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  rl.on("SIGINT", () => {
    process.exit(0);
  });

  while (true) {
    try {
      const input = await rl.question("#_ ");
      const [command, ...args] = input.trim().split(/\s+/);

      switch (command.toLowerCase()) {
        case "up":
          await handleUp();
          break;
        case "ls":
          await handleLs();
          break;
        case "cat":
          await handleCat(args[0]);
          break;
        case "add":
          await handleAdd(args[0]);
          break;
        case "cd":
          await handleCd(args[0]);
          break;
        case "cp":
          await handleCp(args[0], args[1]);
          break;
        case "mv":
          await handleMv(args[0], args[1]);
          break;
        case "rn":
          await handleRn(args[0], args[1]);
          break;
        case "rm":
          await handleRm(args[0]);
          break;
        case "mkdir":
          await handleMkdir(args[0]);
          break;
        case "rmdir":
          await handleRmdir(args[0]);
          break;
        case "os":
          await handleOs(args[0]);
          break;
        case "hash":
          await handleHash(args[0]);
          break;
        case "compress":
          await handleCompress(args[0], args[1]);
          break;
        case "decompress":
          await handleDecompress(args[0], args[1]);
          break;
        case ".exit":
          rl.close();
          return;
        default:
          logMessage(`Invalid input - unknown command`);
          logMessage(
            "Available commands: ls, cd, cp, mv, rm, mkdir, rmdir, .exit"
          );
      }

      //await printCurrentDirectory();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};

export default readlineCommand;
