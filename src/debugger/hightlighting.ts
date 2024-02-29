import { vm, lines, words, list2D, output, input } from './parser';
import commands from './processorTokens/commandsToken';
import { range, pallete } from './processorTokens/mainProcessor';
import { getError } from './errorHandler';

let codeArea: string[] = [];

const hightlighting = () => {
  for (let line = 0; line < list2D.length; line++) {
    if (!(list2D[line][0] in commands)) getError('This command not exist', line, 0, list2D[line][0]);
    codeArea.push(`<span class = purple>${list2D[line][0]}</span>`);
    for (let word = 1; word < list2D[line].length; word++) {
      // @ts-ignore
      if (commands[list2D[line][0]].select) {

      }else{
        // @ts-ignore
        if (!(list2D[line][word] in commands[list2D[line][word]].commands[word].type)) getError('Incorect input', line, word, list2D[line][word]);
        // @ts-ignore
        if (commands[list2D[line][word]].commands[word].input == 'input') codeArea.push(`<span class = yellow>${list2D[line][word]}</span>`);
        // @ts-ignore
        if (commands[list2D[line][word]].commands[word].input == 'output') codeArea.push(`<span class = green>${list2D[line][word]}</span>`);
      }
    }
  }
  output.textContent = codeArea;
}

export { hightlighting }