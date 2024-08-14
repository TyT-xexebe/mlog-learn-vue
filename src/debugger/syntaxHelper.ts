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
  let syntax: any = [];

  const entries = Object.entries(commandsObj);
  let foundEntry: any = entries.find(
    ([key, { name }]) => name[1] === list2D[lineNum][0]
  );

  if (foundEntry) {
    let subcommand = selectTrueOut(foundEntry, 1, cursorPosition, true);
    if (subcommand) {
      const inputSubList: any = [];
      foundEntry[1].commands.forEach((element: any) => {inputSubList.push(element[subcommand].subcommand)});
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
            return {
              'output': output,
              'syntax': ['command', inputSubList]
            }
          } else {
            output += line[0];
            output += " line";
            output += " subcommand";
            let jumpLine = line[1] ? line[1] : 'jumpLine';
            return {
              'output': output,
              'syntax': ['command', jumpLine, inputSubList]
            }
          }
        }

        output += line[0];
        syntax.push('command');

        for (let inputs = 0; inputs < command.length; inputs++) {
          if (inputs == 0) continue;
          if (inputs == subcommand) {
            output += " subcommand";
            syntax.push(inputSubList);
            continue;
          }
          output += ` ${command[inputs].type}`;
          syntax.push(command[inputs].input);
        }
        return {
          'output': output,
          'syntax': syntax
        };

      } else {
        if (line[0] != "jump") {
          output += line[0];
          output += " subcommand";
          return {
            'output': output,
            'syntax': ['command', inputSubList]
          }
        } else {
          output += line[0];
          output += " line";
          output += " subcommand";
          let jumpLine = line[1] ? line[1] : 'jumpLine';
          return {
            'output': output,
            'syntax': ['command', jumpLine, inputSubList]
          }
        }
      }
    } else {
      const command = foundEntry[1].commands[0];
      output += line[0];
      syntax.push('command');
        for (let inputs = 0; inputs < command.length; inputs++) {
        if (inputs == 0) continue;
        output += ` ${command[inputs].type}`;
        syntax.push(command[inputs].input);
      }
      return {
        'output': output,
        'syntax': syntax
      }
    }
  } else {
    return false;
  }
};

export { commandSyntaxOutput };
