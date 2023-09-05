import { createI18n } from 'vue-i18n';

// Language files
import English from './locales/en.json';
import French from './locales/fr.json';
import Brazilian from './locales/pt-BR.json';
import Spanish from './locales/es.json';
import Italian from './locales/it.json';
import Dutch from './locales/nl.json';
import German from './locales/de.json';

function loadLocaleMessages() {
  const locales = { English , French, Brazilian, Spanish, Italian, Dutch, German};
  const messages = {};
  for (const key in locales) {
    messages[key] = locales[key];
  }
  return messages;
}

export default createI18n({
  locale: 'English',
  fallbackLocale: 'English',
  messages: loadLocaleMessages()
});

  
//   nl.js (Dutch)
//   fr.js (French)
//   de.js (German)
//   es.js (Spanish)
//   en.js (English)
//   it.js (Italian)
//   pt-PT.js (Portuguese)
