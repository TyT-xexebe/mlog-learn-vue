import MyComponent from './../views/Debugger.vue';
import { createApp, ref, defineComponent } from 'vue';
import { consoleOutput } from './../main'

type MyComponentType = ReturnType<typeof defineComponent>;
const componentInstance = ref<MyComponentType | null>(null);
const app = createApp(MyComponent);
const vm = app.mount('#app');

const output:any = vm.$refs.output
const input:any = vm.$refs.input

let lines: string[];
let words: string[];
let list2D: string[];

const outputData = () => {
  consoleOutput(input)
  lines = input.textContent.split('\n');
  words = input.textContent.split('/\s/');
  list2D = lines.map((line: any) => line.split(/\s/));
  consoleOutput(list2D);
}
export { vm, lines, words, list2D, output, input, outputData }