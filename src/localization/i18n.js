import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
import en from './en.json';
import fr from './fr.json';

const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'fr',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;