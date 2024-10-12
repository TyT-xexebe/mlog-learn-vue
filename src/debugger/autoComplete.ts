import { consoleOutput } from "./../main";
import { list2D } from "./parser";
import commands from "./processorTokens/commandsToken";
import { range } from "./processorTokens/mainProcessor";
import { selectTrueOut } from "./hightlighting";

const commandsObj = commands.commands;

const createAutocompleteList = (cursorPosition: any) => {
  if (cursorPosition == undefined ) return false;

  const lineNum = list2D.findIndex(line => line.join(" ") === cursorPosition[2]);
  if (lineNum === -1) return false;

  const line = list2D[lineNum];
  const foundEntry = Object.entries(commandsObj)
    .find(([_, { name }]) => name[1] === line[0]);

  if (!foundEntry) return Object.keys(commandsObj);

  const [_, entry] = foundEntry;
  const subcommand = selectTrueOut(foundEntry, 1, cursorPosition[2], true);

  const selectedLine = cursorPosition[1].split(' ');
  const selectedWord = selectedLine[selectedLine.length - 1];
  const inputSubList = entry.commands.map((cmd: any) => cmd[subcommand]?.subcommand);

  if (subcommand) {
    const command = entry.commands.find((cmd: any) => cmd[subcommand]?.subcommand === line[subcommand]);
    if (command) {
      const ranges = command[selectedLine.length].input;
      return {
        word: selectedWord,
        ranges: ranges
      }
    }else{
      return inputSubList;
    }
  }
  consoleOutput(entry)
  consoleOutput(selectedLine.length)
  const ranges = entry.commands[0][selectedLine.length].input;

  return {
    word: selectedWord,
    ranges: ranges
  }
}

const mergeA = (cursor: any) => {

}

export { createAutocompleteList };