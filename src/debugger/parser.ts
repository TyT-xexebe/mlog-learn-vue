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
    lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    output = outputDiv;
    words = text.split(/\s+/).filter(word => word.length > 0);
    list2D = lines.map(line => line.split(/\s+/).filter(word => word.length > 0));
  }
  consoleOutput(lines);
};

export { lines, words, list2D, output, outputData };
