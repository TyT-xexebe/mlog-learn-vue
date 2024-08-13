import { consoleOutput } from "./../main";
import { /* lines, words, */ list2D } from "./parser";
import commands from "./processorTokens/commandsToken";
import { range } from "./processorTokens/mainProcessor";
import { selectTrueOut } from "./hightlighting";
import { OutputFileType } from "typescript";

const commandsObj = commands.commands;

const commandSyntaxOutput = (cursorPosition: any) => {
  let lineNum: number = -1;
  if (cursorPosition == undefined) return 'Syntax Helper';

  list2D.forEach((line, index) => {
    let string: string = line.join(" ");
    if (cursorPosition == string) {
      lineNum = index;
    }
  });

  if (lineNum == -1) return false;

  const line = list2D[lineNum];
  let output = "";

  const entries = Object.entries(commandsObj);
  let foundEntry: any = entries.find(
    ([key, { name }]) => name[1] === list2D[lineNum][0]
  );

  if (foundEntry) {
    let subcommand = selectTrueOut(foundEntry, 1, cursorPosition, true);
    if (subcommand) {
      if (line[subcommand] != undefined) {
        let cmdNum: number = 0;
        foundEntry[1].commands.forEach((command: any, index: number) => {
          if(command[subcommand].subcommand == line[subcommand]) {
            cmdNum = index;
          }
        })
        const command = foundEntry[1].commands[cmdNum];

        if(command == undefined) {
          if (line[0] != "jump") {
            output += line[0];
            output += " subcommand";
            return output;
          } else {
            output += line[0];
            output += " line";
            output += " subcommand";
            return output;
          }
        }

        output += line[0];

        for (let inputs = 0; inputs < command.length; inputs++) {
          if (inputs == 0) continue;
          if (inputs == subcommand) {
            output += " subcommand";
            continue;
          }
          output += ` ${command[inputs].type}`;
        }
        return output;
      } else {
        if (line[0] != "jump") {
          output += line[0];
          output += " subcommand";
          return output;
        } else {
          output += line[0];
          output += " line";
          output += " subcommand";
          return output;
        }
      }
    } else {
      const command = foundEntry[1].commands[0];
      output += line[0];
      for (let inputs = 0; inputs < command.length; inputs++) {
        if (inputs == 0) continue;
        output += ` ${command[inputs].type}`;
      }
      return output;
    }
  } else {
    return false;
  }
};

export { commandSyntaxOutput };
