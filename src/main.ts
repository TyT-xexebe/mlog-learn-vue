import App from "@/App.vue"
import components from "./components/UI/template-assembly"
import { createApp } from 'vue'
import router from './router/router'
import { createI18n } from 'vue-i18n';

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

app.use(i18n)
app.use(router);
app.mount('#app');