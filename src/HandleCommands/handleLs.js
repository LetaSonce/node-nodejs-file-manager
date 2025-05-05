import { readdir, stat } from "node:fs/promises";
import { cwd } from "node:process";
import { join } from "node:path";
import { logMessage } from "../utils.js";

const handleLs = async () => {
  try {
    const items = await readdir(cwd());
    const itemsWithTypes = await Promise.all(
      items.map(async (item, index) => {
        try {
          const itemPath = join(cwd(), item);
          const itemStat = await stat(itemPath);
          return {
            id: index,
            name: item,
            type: itemStat.isDirectory() ? "directory" : "file",
            error: null,
          };
        } catch (err) {
          return {
            id: index,
            name: item,
            type: "unknown",
            error: err.message,
          };
        }
      })
    );

    const validItems = itemsWithTypes.filter((item) => !item.error);
    if (validItems.length === 0) {
      return logMessage("Directory is empty");
    }

    const directories = validItems
      .filter((item) => item.type === "directory")
      .sort((a, b) => a.name.localeCompare(b.name));

    const files = validItems
      .filter((item) => item.type === "file")
      .sort((a, b) => a.name.localeCompare(b.name));

    const maxNameLength =
      Math.max(
        ...directories.map((d) => d.name.length),
        ...files.map((f) => f.name.length),
        4
      ) + 6;

    const centerText = (text, width, quote = false) => {
      const padding = Math.max(0, width - text.length);
      const leftPadding = Math.floor(padding / 2);
      const rightPadding = padding - leftPadding;
      const intoText = quote ? "'" + text + "'" : text;
      return " ".repeat(leftPadding) + intoText + " ".repeat(rightPadding);
    };

    const headers = [
      centerText("(index)", 8),
      centerText("Name", maxNameLength),
      centerText("Type", 10),
    ];

    logMessage("\nCurrent directory content:");
    logMessage("-".repeat(maxNameLength + 34));
    logMessage(`| ${headers.join(" | ")} |`);
    logMessage("-".repeat(maxNameLength + 34));

    directories.forEach((item, index) => {
      const row = [
        centerText(index.toString(), 8),
        centerText(item.name, maxNameLength, true),
        centerText(item.type, 10, true),
      ];
      logMessage(`| ${row.join(" | ")} |`);
    });

    files.forEach((item, index) => {
      const row = [
        centerText((index + directories.length).toString(), 8),
        centerText(item.name, maxNameLength, true),
        centerText(item.type, 10, true),
      ];
      logMessage(`| ${row.join(" | ")} |`);
    });

    logMessage("-".repeat(maxNameLength + 34));

    //logMessage(files.join("\n"));
  } catch {
    logMessage("Operation failed");
  }
};

export default handleLs;
