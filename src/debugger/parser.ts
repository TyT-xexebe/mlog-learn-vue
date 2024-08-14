import { consoleOutput } from './../main';

let lines: string[];
let words: string[];
let list2D: string[][];
let output: any;

const outputData = (text: string, outputDiv: any) => {
  if (!text) {
    lines = [];
    words = [];
    list2D = [];

  } else {
    lines = text.split('\n');
    output = outputDiv;
    words = text.split(/\s+/);
    list2D = lines.map(line => line.split(/\s+/));
  }
};

export { lines, words, list2D, output, outputData };
