import { /* lines, words, */ list2D } from "./parser";
import commands from "./processorTokens/commandsToken";
// import { range, pallete } from './processorTokens/mainProcessor';
import { getError, reload } from "./errorHandler";
import { consoleOutput } from "./../main";
import { labelGroupMerge } from './labelChecker';

let codeArea: string[] = [];
let setLabels: any[] = [];
let usedLabels: any[] = [];
let usedVars: any[] = [];
const commandsList = commands.commands;

// hightlighting colors map
const colorMap: { [key: string]: string } = {
  input: "yellow",
  output: "green",
  error: "red",
  default: "default",
};

// add hightlighted words to code
const addCodeArea = (color: string, text: any) => {
  codeArea.push(`<span class="${color}">${text}</span>`);
};

// checking type of command input
const IandO = (
  line: number,
  word: number,
  color: string = "null",
  inputType: any = false
) => {
  const entries = Object.entries(commandsList);
  let foundEntry: any = entries.find(
    ([key, { name }]) => name[1] === list2D[line][0]
  );

  let type: string;
  if (inputType == false) {
    type = foundEntry[1].commands[0][word].type;
  } else {
    type = inputType[word].type;
  }
  
  // saving variables
  if (type == 'output') usedVars.push(list2D[line][word]);

  if (color === "null") {
    addCodeArea(colorMap[type], list2D[line][word]);
  } else {
    addCodeArea(colorMap[color], list2D[line][word]);
  }
};

const zipCheckType = (
  zipC: any[],
  line: number,
  word: number,
  inputType: boolean = false
) => {
  const errorArr: [string, number, number, string][] = [];

  for (const check of zipC) {
    if (Array.isArray(check)) {
      const [type, ...rest] = check;

      if (type === "$#$default") {
        if (rest.includes(list2D[line][word])) {
          IandO(line, word, "null", inputType);
          return;
        }
        errorArr.push(["not in array of variables", line, word, list2D[line][word]]);
      } else if (type === "$#$at") {
        const patterns = rest.map((value: any) => new RegExp(`^${value}[1-9]\\d*$`));
        if (patterns.some((pattern: RegExp) => pattern.test(list2D[line][word]))) {
          IandO(line, word, "null", inputType);
          return;
        }
        errorArr.push(["not in array of variables", line, word, list2D[line][word]]);
      } else if (type === "$#$obj") {
        const value = list2D[line][word - 1];
        const match = value.match(/^.*(\d+)$/);
        const trimmed = value.replace(/(\d+)$/, '');
        const result = match ? (match[1] === "0" ? "error" : true) : false;

        if (result === "error") {
          errorArr.push(["Incorrect input", line, word, value]);
        } else if (result) {
          const foundConfig = rest.find((item: any) => item.blocks?.includes(trimmed));
          if (foundConfig?.type.includes(list2D[line][word])) {
            IandO(line, word, "null", inputType);
            return;
          }
          errorArr.push(["not in array of variables", line, word, list2D[line][word]]);
        } else {
          if (rest.slice(1).some((item: any) => item.type.includes(list2D[line][word]))) {
            IandO(line, word, "null", inputType);
            return;
          }
          errorArr.push(["not in array of variables", line, word, list2D[line][word]]);
        }
      }
    } else if (check.type === "func") {
      const returnedData = check.range(list2D[line][word]);
      if (returnedData.answer) {
        IandO(line, word, "default", inputType);
        return;
      }
      errorArr.push([returnedData.issue, line, word, list2D[line][word]]);
    } else if (check.type === "regexp") {
      if (check.range.test(list2D[line][word])) {
        IandO(line, word, "null", inputType);
        return;
      }
      errorArr.push(["return issue [ regexp ]", line, word, list2D[line][word]]);
    }
  }

  let added = false;
  errorArr.forEach((error) => {
    getError(...error);
    if (!added) {
      addCodeArea("red", list2D[line][word]);
      added = true;
    }
  });
};



// print checker
const printCmd = (foundEntry: any, word: number, line: number) => {
  const last = list2D[line].length - 1;
  const hasMatchingQuotes =
    (list2D[line][1].startsWith("'") && list2D[line][last].endsWith("'")) ||
    (list2D[line][1].startsWith('"') && list2D[line][last].endsWith('"'));

  if (hasMatchingQuotes) {
    addCodeArea("default", list2D[line][word]);
  } else if (!hasMatchingQuotes) {
    if (word < 2) {
      let zipC = foundEntry[1].commands[0][word].input;
      zipCheckType(zipC, line, word);
    } else {
      getError("Incorrect input1", line, word, list2D[line][word]);
      addCodeArea("red", list2D[line][word]);
    }
  } else {
    getError("Incorrect input2", line, word, list2D[line][word]);
    addCodeArea("red", list2D[line][word]);
  }
};

// checker for non select commands
const selectFalseOut = (foundEntry: any, word: number, line: number) => {
  if (foundEntry[0] == "print") {
    printCmd(foundEntry, word, line);
  } else {
    if (foundEntry[1].commands[0][word] == undefined) {
      addCodeArea("red", list2D[line][word]);
      getError("Incorrect input", line, word, list2D[line][word]);
    } else {
      let zipC = foundEntry[1].commands[0][word].input;
      zipCheckType(zipC, line, word);
    }
  }
};

// checker for select commands
const selectTrueOut = (
  foundEntry: any,
  word: number,
  line: number,
  returnSub: boolean = false
) => {
  let commandEntry: any = false;
  let subCommandNum: any = false;
  foundEntry[1].commands.forEach((command: any, index1: number) => {
    command.forEach((element: any, index2: number) => {
      if (index2 != 0) {
        if ("subcommand" in element) {
          subCommandNum = index2;
        }
      }
    });
  });

  if (returnSub == true) return subCommandNum;

  const subCommand = list2D[line][subCommandNum];

  foundEntry[1].commands.forEach((command: any) => {
    if (command[subCommandNum].subcommand == subCommand) {
      commandEntry = command;
    }
  });

  if (word == subCommandNum) {
    if (commandEntry == false || commandEntry == null) {
      getError(
        "Incorrect input subcommand",
        line,
        word,
        list2D[line][subCommandNum]
      );
      addCodeArea("red", list2D[line][subCommandNum]);
    } else {
      addCodeArea("purple", list2D[line][subCommandNum]);
    }
    return;
  }

  if (commandEntry == false || commandEntry == null) {
    addCodeArea("red", list2D[line][word]);
    getError("Incorrect input", line, word, list2D[line][word]);
  } else {
    if (commandEntry[word] == undefined) {
      addCodeArea("red", list2D[line][word]);
      getError("Incorrect input", line, word, list2D[line][word]);
    } else {
      let zipC = commandEntry[word].input;
      zipCheckType(zipC, line, word, commandEntry);
    }
  }
};

// code parser & hightlighting chain
const hightlighting = (outputHtml: any) => {
  codeArea = [];
  setLabels = [];
  usedLabels = [];
  usedVars = [];
  reload();

  for (let line = 0; line < list2D.length; line++) {
    if (list2D[line][0] == undefined) continue;

    let notExist = false;
    const entries = Object.entries(commandsList);
    let foundEntry: any = entries.find(
      ([key, { name }]) => name[1] === list2D[line][0]
    );

    // labels:
    if (list2D[line][0].endsWith(":")) {
      addCodeArea("default", list2D[line][0]);
      setLabels.push([list2D[line][0].slice(0, -1), line, 0]);
      for (let word = 1; word < list2D[line].length; word++) {
        addCodeArea("red", list2D[line][word]);
        getError("Incorrect input", line, word, list2D[line][word]);
      }
      codeArea.push("<br>");
      continue;
    }

    // default commands
    if (list2D[line].length === 0 || !foundEntry) {
      getError("This command not exist", line, 0, list2D[line][0]);
      addCodeArea("red", list2D[line][0]);
      notExist = true;
    } else {
      addCodeArea("purple", list2D[line][0]);
      if (list2D[line][0] == "jump" && list2D[line][1] != undefined) {
        usedLabels.push([list2D[line][1], line, 1]);
      }
    }

    for (let word = 1; word < list2D[line].length; word++) {
      if (!list2D[line][word]) continue;

      if (notExist == true) {
        addCodeArea("red", list2D[line][word]);
        getError("Incorrect input", line, word, list2D[line][word]);
        continue;
      }

      switch (foundEntry[1].select) {
        case true:
          selectTrueOut(foundEntry, word, line);
          break;
        case false:
          selectFalseOut(foundEntry, word, line);
          break;
        case "func":
          break;
        case "end":
          break;
      }
    }
    codeArea.push("<br>");
  }
  outputHtml.value = codeArea.join(" ");
  labelGroupMerge(setLabels, usedLabels);
};

export { hightlighting, selectTrueOut, usedVars };
