import { consoleOutput } from './../main';
let errArray = [];
const getError = (text: string, line: number, word: number, err: any) => {
  errArray.push({text, line, word});
  consoleOutput({text, line, word, err});
}

export { getError }