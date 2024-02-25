import App from "@/App.vue";
import components from "./components/UI/template-assembly";
import { createApp, ComponentPublicInstance } from 'vue';
import router from './router/router';
import { createI18n } from 'vue-i18n';
import { vm } from './debugger/parser'

const i18n = createI18n({
  locale: 'en', 
  messages: {
    en: require('./locales/en.json'),
    ru: require('./locales/ru.json'),
    uk: require('./locales/uk.json')
  }
});

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});

const consoleOutput = (data: any) => console.log(data);

app.use(i18n)
app.use(router);
app.mount('#app');

export { consoleOutput }