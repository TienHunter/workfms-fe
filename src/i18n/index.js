
import { createI18n } from 'vue-i18n'
import viMessage from "./vi.js";
import enMessage from "./en.js";
const messages = {
   vi: viMessage,
   en: enMessage
};

const i18n = new createI18n({
   legacy: false,
   locale: 'vi',
   fallbackLocale: 'vi',
   messages
})

export default i18n;