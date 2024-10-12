import { consoleOutput } from "./../main";
import { list2D } from "./parser";
import commands from "./processorTokens/commandsToken";
import { range } from "./processorTokens/mainProcessor";
import { selectTrueOut, usedVars } from "./hightlighting";
import { isFunctionLike, isTypeNode } from "typescript";

const commandsObj = commands.commands;

const createAutocompleteList = (cursorPosition: any) => {
  if (cursorPosition == undefined ) return false;

  const lineNum = list2D.findIndex(line => line.join(" ") === cursorPosition[2]);
  if (lineNum === -1) return false;

  const line = list2D[lineNum];
  const foundEntry = Object.entries(commandsObj)
    .find(([_, { name }]) => name[1] === line[0]);

  const selectedLine = cursorPosition[1].split(' ');
  const selectedWord = selectedLine[selectedLine.length - 1];
  
  if (!foundEntry) return {
    word: selectedWord,
    ranges: Object.keys(commandsObj)
  }

  const [_, entry] = foundEntry;
  const subcommand = selectTrueOut(foundEntry, 1, cursorPosition[2], true);

  const inputSubList = entry.commands.map((cmd: any) => cmd[subcommand]?.subcommand);

  if (subcommand) {
    const command = entry.commands.find((cmd: any) => cmd[subcommand]?.subcommand === line[subcommand]);
    if (command) {
      if(selectedLine.length == 2) return false; 
      const ranges = command[selectedLine.length - 1].input;
      return {
        word: selectedWord,
        ranges: ranges,
        line: selectedLine,
        type: command[selectedLine.length - 1].type
      }
    }else{
      return {
        word: selectedWord,
        ranges: inputSubList
      }
    }
  }
  if(selectedLine.length == 1) return false; 
  const ranges = entry.commands[0][selectedLine.length - 1].input;

  return {
    word: selectedWord,
    ranges: ranges,
    type: entry.commands[0][selectedLine.length - 1].type
  }
}

const mergeA = (cursor: any) => {
  const data: any = createAutocompleteList(cursor);
  if (!data) return false

  const results1: any[] = [];
  const arrays = (Array.isArray(data.ranges[0]) || typeof data.ranges[0] === 'object') ? data.ranges : [data.ranges];
    arrays.forEach((range: any) => {
      consoleOutput(usedVars)
      if (range.rangeS == 'variable' && usedVars.length != 0 && data.type == 'input') return results1.push(usedVars);
      if (range.rangeS) return;

      if (Array.isArray(range)) {
        const [type, ...rest] = range;
        if (!range[0].startsWith('$#$')) return results1.push(range);

        if (type != '$#$obj') {return results1.push(rest)} else {
          const foundConfig = rest.find((item: any) => item.blocks?.includes(data.line[data.line.length - 2]));
          return results1.push(foundConfig.type);
        }
      }
    });

  if (results1.length == 0) return false;
  const results2 = new Set<string>();
  consoleOutput(results1)
  for (const array of results1) {
      for (const word2 of array) {
          if (word2.startsWith(data.word)) {
              results2.add(word2);
          }
      }
  }
  return Array.from(results2);
}

export { mergeA };