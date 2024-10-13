import { consoleOutput } from "./../main";
import { list2D } from "./parser";
import commands from "./processorTokens/commandsToken";
import { range } from "./processorTokens/mainProcessor";
import { selectTrueOut } from "./hightlighting";

const commandsObj = commands.commands;

const commandSyntaxOutput = (cursorPosition: any) => {
  if (cursorPosition == undefined) return "Syntax Helper";

  const lineNum = list2D.findIndex((line) => line.join(" ") === cursorPosition);
  if (lineNum === -1) return false;

  const line = list2D[lineNum];
  const foundEntry = Object.entries(commandsObj).find(
    ([_, { name }]) => name[1] === line[0]
  );
  const brType = "<br style='padding: 0 !important; margin: 0 !important;'>";
  const commandList: any = Object.keys(commandsObj).join(brType);

  if (!foundEntry)
    return {
      output: "commands",
      syntax: [commandList],
    };

  const [_, entry] = foundEntry;

  const subcommand = selectTrueOut(foundEntry, 1, cursorPosition, true);
  const inputSubList = entry.commands
    .map((cmd: any) => cmd[subcommand]?.subcommand)
    .join(brType);
  if (subcommand) {
    const command = entry.commands.find(
      (cmd: any) => cmd[subcommand]?.subcommand === line[subcommand]
    );
    if (!command) {
      if (line[0] == "jump") {
        const jumpLine = line[1] || "jumpLine";
        return {
          output: `${line[0]} jumpToLine subcommand`,
          syntax: ["command", jumpLine, inputSubList],
        };
      } else {
        return {
          output: `${line[0]} subcommand`,
          syntax: ["command", inputSubList],
        };
      }
    }

    let output = `${line[0]}`;
    const syntax = ["command"];

    command.forEach((input: any, index: number) => {
      if (index == 0) return;
      if (index == subcommand) {
        output += " subcommand";
        syntax.push(inputSubList);
      } else {
        output += ` ${input.type}`;
        const output2 = input.input
          .map(
            (cmd: any) =>
              cmd.rangeS ||
              Object.keys(range).find((key) => range[key] === cmd) ||
              "ERROR"
          )
          .join(brType);
        syntax.push(output2);
      }
    });

    return { output, syntax };
  }

  const command = entry.commands[0];
  let output = `${line[0]}`;
  const syntax = ["command"];

  command.forEach((input: any, index: number) => {
    if (index === 0) return;
    output += ` ${input.type}`;
    const output2 = input.input
      .map(
        (cmd: any) =>
          cmd.rangeS ||
          Object.keys(range).find((key) => range[key] === cmd) ||
          "ERROR"
      )
      .join(brType);
    syntax.push(output2);
  });

  return { output, syntax };
};

const mergeT = (cursor: any) => {
  const data: any = commandSyntaxOutput(cursor);
  if (typeof data == "string")
    return [
      {
        item: data,
        tooltipContent: "",
      },
    ];
  if (!data || !data.output) return false;

  return data.output.split(" ").map((word: any, index: number) => ({
    item: word,
    tooltipContent: data.syntax[index],
  }));
};

export { commandSyntaxOutput, mergeT };
