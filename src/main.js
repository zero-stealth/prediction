import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { ref } from 'vue';

import App from './App.vue';
import router from './router';
import './style/global.css';

import English from './locales/en.json';
import French from './locales/fr.json';
import Brazilian from './locales/pt-BR.json';
import Spanish from './locales/es.json';
import Italian from './locales/it.json';
import Dutch from './locales/nl.json';
import German from './locales/de.json';

function loadLocaleMessages() {
  const locales = { English, French, Brazilian, Spanish, Italian, Dutch, German };
  return Object.fromEntries(Object.entries(locales).map(([key, value]) => [key, value]));
}

const savedLanguage = ref(null);



function setInitialLanguage() {
  savedLanguage.value = localStorage.getItem('selectedLanguage') || 'English';
}

setInitialLanguage(); 

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage.value,
  fallbackLocale: 'English',
  messages: loadLocaleMessages(),
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.mount('#app');
