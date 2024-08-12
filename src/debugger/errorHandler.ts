import { consoleOutput } from './../main';
import {/* lines, words, */list2D } from './parser';

let errArray: any = [];

const updateErrorList = () => {
  let errorText = '';
  errArray.forEach((error: any) => {
    errorText += `<span>${error.text} | line ${error.line} word ${error.word} | error <span class="red">${error.err}</span></span>\n`;
  });
  consoleOutput(errArray);
  consoleOutput(errorText);
  return errorText;
}

const getError = (text: string, line: number, word: number, err: any) => {
  errArray.push({text, line, word, err});
  consoleOutput({text, line, word, err});
}

const reload = () => {errArray = []} 

export { getError, updateErrorList, reload }