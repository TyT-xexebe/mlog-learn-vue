import { consoleOutput } from './../main';

let lines: string[];
let words: string[];
let list2D: string[][];
let output: any;

const outputData = (text: string, outputDiv: any, divText: any) => {
  if (!text) {
    lines = [];
    words = [];
    list2D = [];

  } else {
    lines = [];
    let chapters = divText.split('</div>');
    chapters.forEach((chapter: any) => {
      lines.push(chapter.replace(/<\/?div>|<br>/g, ''))
    });
    output = outputDiv;
    words = text.split(/\s+/);
    list2D = lines.map(line => line.split(/\s+/));
  }
};

export { lines, words, list2D, output, outputData };
