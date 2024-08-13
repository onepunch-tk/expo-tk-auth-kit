import chalk from "chalk";

import { BOX_WIDTH, MODULE_NAME } from "../constants";

function centerText(text: string, width: number): string {
  const padding = Math.max(0, width - text.length);
  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;
  return " ".repeat(leftPad) + text + " ".repeat(rightPad);
}

function padText(text: string, width: number): string {
  if (text.length <= width) {
    return text.padEnd(width);
  }
  // 긴 텍스트를 여러 줄로 나누기
  const lines: string[] = [];
  let currentLine = "";
  const words = text.split(" ");
  for (const word of words) {
    if ((currentLine + word).length > width) {
      lines.push(currentLine.trim().padEnd(width));
      currentLine = "";
    }
    currentLine += word + " ";
  }
  if (currentLine) {
    lines.push(currentLine.trim().padEnd(width));
  }
  return lines.join("\n│ ");
}

export function logConfigError(error: Error): void {
  const headerText = `${MODULE_NAME} Configuration Error`;
  const header = centerText(headerText, BOX_WIDTH - 4); // -4 for '│ ' on both sides
  const errorMessage = padText(error.message, BOX_WIDTH - 4);
  const footer1 = "Please check your plugin configuration in app.json";
  const footer2 = "or app.config.js and ensure all required fields";
  const footer3 = "are correctly specified.";

  console.error(
    chalk.red(`
┌${"─".repeat(BOX_WIDTH - 2)}┐
│ ${header} │
├${"─".repeat(BOX_WIDTH - 2)}┤
│ ${errorMessage} │
├${"─".repeat(BOX_WIDTH - 2)}┤
│ ${padText(footer1, BOX_WIDTH - 4)} │
│ ${padText(footer2, BOX_WIDTH - 4)} │
│ ${padText(footer3, BOX_WIDTH - 4)} │
└${"─".repeat(BOX_WIDTH - 2)}┘
`),
  );
}
