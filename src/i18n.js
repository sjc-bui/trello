import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translationEN from './public/locales/en/translation.json';
import translationJP from './public/locales/ja/translation.json';
import { defaultLanguage } from './utils/helper';

const resources = {
    en: {
        translation: translationEN
    },
    ja: {
        translation: translationJP
    }
};

var lng = defaultLanguage();

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        lng: lng,
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
