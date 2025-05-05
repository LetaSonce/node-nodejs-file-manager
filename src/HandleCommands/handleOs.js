import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { env } from "node:process";
import { logMessage } from "../utils.js";

const getEolInfo = () => {
  const eolDisplay = EOL === "\n" ? "\\n (LF)" : "\\r\\n (CRLF)";
  const eolHex = EOL === "\n" ? "0x0A" : "0x0D0A";

  logMessage(`System End-Of-Line (EOL) information:
        - Default EOL character: ${eolDisplay}
        - Hex representation: ${eolHex}
        - Platform: ${EOL === "\n" ? "Unix/Linux/macOS" : "Windows"}
        `);
};

const getCpusInfo = () => {
  const cpuInfo = cpus();
  logMessage(`Total CPUs: ${cpuInfo.length}`);

  logMessage("-----------------");

  cpuInfo.forEach((cpu, index) => {
    logMessage("-----------------");
    const speedGHz = (cpu.speed / 1000).toFixed(2);
    logMessage(`Kernel ${index + 1}:`);
    logMessage(`Model: ${cpu.model.trim()}`);
    logMessage(`Clock Rate: ${speedGHz} GHz`);
  });
};

const handleOs = async (arg) => {
  switch (arg) {
    case "--EOL":
      getEolInfo();
      break;
    case "--cpus":
      getCpusInfo();
      break;
    case "--homedir":
      logMessage(homedir());
      break;
    case "--username":
      logMessage(env.USER || env.USERNAME || userInfo().username);
      break;
    case "--architecture":
      logMessage(arch());
      break;
  }
};

export default handleOs;
