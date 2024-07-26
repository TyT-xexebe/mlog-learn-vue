import {/* lines, words, */list2D } from './parser';
import commands from './processorTokens/commandsToken';
// import { range, pallete } from './processorTokens/mainProcessor';
import { getError } from './errorHandler';
import { consoleOutput } from './../main';

let codeArea: string[] = [];
const commandsList = commands.commands;

const colorMap: { [key: string]: string } = {
  input: 'yellow',
  output: 'green',
  error: 'red',
  default: 'default'
};

const addCodeArea = (color: string, text: any) => {
  codeArea.push(`<span class="${color}">${text}</span>`);
};

const IandO = (line: number, word: number, color: string = 'null') => {
  const entries = Object.entries(commandsList);
  let foundEntry: any = entries.find(([key, { name }]) => name[1] === list2D[line][0]);
  const type: string = foundEntry[1].commands[0][word].type;

  if (color === 'null') {addCodeArea(colorMap[type], list2D[line][word]);}
  else {addCodeArea(colorMap[color], list2D[line][word]);}
};

const selectFalseOut = (foundEntry: any, word: number, line: number) => {
  let zipC = foundEntry[1].commands[0][word].input;
  let validInput = false;

  for (let check = 0; check < zipC.length; check++) {

    if (Array.isArray(zipC[check])) {
      if (zipC[check].includes(list2D[line][word])) {
        IandO(line, word);
        validInput = true;
        break;
      }

    } else if (zipC[check].type === 'func') {
      let returnedData = zipC[check].range(list2D[line][word]);
      if (returnedData.answer) {
        IandO(line, word, 'default');
        validInput = true;
        break;
      } else {
        getError(returnedData.issue, line, word, list2D[line][word]);
        addCodeArea("red", list2D[line][word]);
        validInput = true;
      }

    } else if (zipC[check].type === 'regexp') {
      let regexTest = zipC[check].range;
      if (regexTest.test(list2D[line][word])) {
        IandO(line, word);
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

const hightlighting = (outputHtml: any) => {
  codeArea = [];
  for (let line = 0; line < list2D.length; line++) {

    const entries = Object.entries(commandsList);
    let foundEntry: any = entries.find(([key, { name }]) => name[1] === list2D[line][0]);

    if (list2D[line].length === 0 || !(foundEntry)) {
      getError('This command not exist', line, 0, list2D[line][0]);
      addCodeArea("red", list2D[line][0]);
    } else {
      addCodeArea("purple", list2D[line][0]);
    }

    for (let word = 1; word < list2D[line].length; word++) {

      if (!list2D[line][word]) continue;

      if (word == foundEntry[1].commands[0].length) {
        addCodeArea("red", list2D[line][word]);
        getError('Incorrect input', line, word, list2D[line][word]);
        continue;
      }

      switch(foundEntry[1].select) {
        case true:
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
