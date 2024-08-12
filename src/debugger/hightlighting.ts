import {/* lines, words, */list2D } from './parser';
import commands from './processorTokens/commandsToken';
// import { range, pallete } from './processorTokens/mainProcessor';
import { getError, reload } from './errorHandler';
import { consoleOutput } from './../main';

let codeArea: string[] = [];
const commandsList = commands.commands;

// hightlighting colors map
const colorMap: { [key: string]: string } = {
  input: 'yellow',
  output: 'green',
  error: 'red',
  default: 'default'
};

// add hightlighted words to code
const addCodeArea = (color: string, text: any) => {
  codeArea.push(`<span class="${color}">${text}</span>`);
};

// checking type of command input
const IandO = (line: number, word: number, color: string = 'null', inputType: any = false) => {
  const entries = Object.entries(commandsList);
  let foundEntry: any = entries.find(([key, { name }]) => name[1] === list2D[line][0]);

  let type: string;
  if(inputType == false){
    type = foundEntry[1].commands[0][word].type;
  }else{
    consoleOutput(inputType);
    type = inputType[word].type;
  }


  if (color === 'null') {addCodeArea(colorMap[type], list2D[line][word]);}
  else {addCodeArea(colorMap[color], list2D[line][word]);}
};


// main 
const zipCheckType = (zipC: any, line: number, word: number, inputType: boolean = false) => {
  let validInput = false;
  let codeAreaUpdated = false;
  for (let check = 0; check < zipC.length; check++) {
    
    if (Array.isArray(zipC[check])) {
      if (zipC[check].includes(list2D[line][word])) {
        IandO(line, word, 'null', inputType);
        validInput = true;
        break;
      }

    } else if (zipC[check].type === 'func') {
      let returnedData = zipC[check].range(list2D[line][word]);
      if (returnedData.answer) {
        IandO(line, word, 'default', inputType);
        validInput = true;
        break;
      } else {
        getError(returnedData.issue, line, word, list2D[line][word]);
        if (!codeAreaUpdated) {
          addCodeArea("red", list2D[line][word]);
          codeAreaUpdated = true;
        }
        validInput = true;
      }

    } else if (zipC[check].type === 'regexp') {
      let regexTest = zipC[check].range;
      if (regexTest.test(list2D[line][word])) {
        IandO(line, word, 'null', inputType);
        validInput = true;
        break;
      } else {
        validInput = false;
      }
    }
  }

  if (!validInput) {
    getError('Incorrect input', line, word, list2D[line][word]);
    addCodeArea("red", list2D[line][word]);
  }
}

// print checker
const printCmd = (foundEntry: any, word: number, line: number) => {
  const last = list2D[line].length - 1;
  consoleOutput(last)
  const hasMatchingQuotes = 
    (list2D[line][1].startsWith("'") && list2D[line][last].endsWith("'")) ||
    (list2D[line][1].startsWith('"') && list2D[line][last].endsWith('"'));

  if (hasMatchingQuotes) {
    consoleOutput('default')
    addCodeArea("default", list2D[line][word]);

  } else if (!hasMatchingQuotes) {
    if(word < 2) {
      let zipC = foundEntry[1].commands[0][word].input;
      zipCheckType(zipC, line, word);
    }else{
      getError('Incorrect input1', line, word, list2D[line][word]);
      addCodeArea("red", list2D[line][word]);
    }
  } else {
    getError('Incorrect input2', line, word, list2D[line][word]);
    addCodeArea("red", list2D[line][word]);
  }
}

// checker for non select commands
const selectFalseOut = (foundEntry: any, word: number, line: number) => {
  if (foundEntry[0] == 'print') {
    printCmd(foundEntry, word, line);
  }else{
    if(foundEntry[1].commands[0][word] == undefined) {
      addCodeArea("red", list2D[line][word]);
      getError('Incorrect input', line, word, list2D[line][word]);
    }else{
      let zipC = foundEntry[1].commands[0][word].input;
      zipCheckType(zipC, line, word);
    }
  }
}

// checker for select commands
const selectTrueOut = (foundEntry: any, word: number, line: number) => {
  let commandEntry: any = false;
  let subCommandNum: any = false;
  
  foundEntry[1].commands.forEach(
    (command: any, index1: number) => {
      command.forEach((element: any, index2: number) => {
        if(index2 != 0) {
          if('subcommand' in element) {
            subCommandNum = index2;
          }
        }
      });
    }
  )

  const subCommand = list2D[line][subCommandNum]; 
  
  foundEntry[1].commands.forEach(
    (command: any) => {
        if(command[subCommandNum].subcommand == subCommand){
          commandEntry = command;
        }
    }
  )

  if (word == subCommandNum){
    if(commandEntry == false || commandEntry == null) {
      getError('Incorrect input subcommand', line, word, list2D[line][subCommandNum]);
      addCodeArea("red", list2D[line][subCommandNum]);
    } else {
      addCodeArea("purple", list2D[line][subCommandNum]);
    }
    return;
  }

  if (commandEntry == false || commandEntry == null) {
    addCodeArea("red", list2D[line][word]);
    getError('Incorrect input', line, word, list2D[line][word]);
  } else {
    if(commandEntry[word] == undefined) {
      addCodeArea("red", list2D[line][word]);
      getError('Incorrect input', line, word, list2D[line][word]);
    }else{
      let zipC = commandEntry[word].input;
      zipCheckType(zipC, line, word, commandEntry);
    }

  }
}

// code parser & hightlighting chain
const hightlighting = (outputHtml: any) => {
  codeArea = [];
  reload();
  
  for (let line = 0; line < list2D.length; line++) {
    let notExist = false;
    const entries = Object.entries(commandsList);
    let foundEntry: any = entries.find(([key, { name }]) => name[1] === list2D[line][0]);

    // labels:
    if (list2D[line][0].endsWith(':')) {
      addCodeArea("default", list2D[line][0]);
      for (let word = 1; word < list2D[line].length; word++) {
        addCodeArea("red", list2D[line][word]);
        getError('Incorrect input', line, word, list2D[line][word]);
      }
      codeArea.push('<br>');
      continue;
    }

    // default commands
    if (list2D[line].length === 0 || !(foundEntry)) {
      getError('This command not exist', line, 0, list2D[line][0]);
      addCodeArea("red", list2D[line][0]);
      notExist = true;
    } else {
      addCodeArea("purple", list2D[line][0]);
    }

    for (let word = 1; word < list2D[line].length; word++) {

      if (!list2D[line][word]) continue;

      if (notExist == true) {
        addCodeArea("red", list2D[line][word]);
        getError('Incorrect input', line, word, list2D[line][word]);
        continue;
      }

      switch(foundEntry[1].select) {
        case true:
          selectTrueOut(foundEntry, word, line);
          break;
        case false:
          selectFalseOut(foundEntry, word, line);
          break;
        case 'func':
          break;
          case 'end':
            break;
      }
    }
    codeArea.push('<br>');
  }
  outputHtml.value = codeArea.join(' ');
};

export { hightlighting };
