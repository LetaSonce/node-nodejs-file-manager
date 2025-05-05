import { cwd } from "node:process";

const printCurrentDirectory = async () => {
  console.log(`You are currently in ${cwd()}`);
};

export default printCurrentDirectory;
