import { consoleOutput } from "./../main";

let mergedLabel: any = [];

const labelGroupMerge = (setLabels: string[], usedLabels: string[]) => {
  const output: any = {};

  if (setLabels.length == 0) return "no label";

  setLabels.forEach(([name1]) => {
    const matches = usedLabels.filter(([name2]) => name1 === name2);
    if (matches.length > 0) {
      output[name1] = output[name1] || [];
      output[name1].push(...matches);
    }
  });

  mergedLabel = output;
  return output;
};

export { labelGroupMerge, mergedLabel };
