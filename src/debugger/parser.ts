import MyComponent from './../views/Debugger.vue';
import { createApp, ref, defineComponent } from 'vue';
import { consoleOutput } from './../main'

type MyComponentType = ReturnType<typeof defineComponent>;
const componentInstance = ref<MyComponentType | null>(null);
const app = createApp(MyComponent);
const vm = app.mount('#app');

const output:any = vm.$refs.output
const input:any = vm.$refs.input

const lines = input.textContent.split('\n');
const words = input.textContent.split('/\s/');
const list2D = lines.map((line: any) => line.split(/\s/));
export { vm, lines, words, list2D, output, input }