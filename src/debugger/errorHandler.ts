import { consoleOutput } from "./../main";
import { /* lines, words, */ list2D } from "./parser";

let errArray: any = [];

const updateErrorList = () => {
  let errorObj: any = {};
  errArray.forEach((error: any) => {
    if (error.line in errorObj) {
      let newErr = `${error.text} | line ${error.line} word ${error.word} | error <span class="red">${error.err}</span>\n`;
      errorObj[error.line].push(newErr);
    } else {
      errorObj[error.line] = [];
      let newErr = `${error.text} | line ${error.line} word ${error.word} | error <span class="red">${error.err}</span>\n`;
      errorObj[error.line].push(newErr);
    }
  });
  return errorObj;
};

const getError = (text: string, line: number, word: number, err: any) => {
  if (err == "") return;
  if (err == undefined) {
    errArray.push({ text: "Global Error", line, word, err });
    return;
  }
  errArray.push({ text, line, word, err });
};

const reload = () => {
  errArray = [];
};

export { getError, updateErrorList, reload };
