import enTranslation from "./locales/en/translation.json"
import ruTranslation from "./locales/ru/translation.json"
import amTranslation from "./locales/am/translation.json"
import { initReactI18next } from "react-i18next"
import i18n from "i18next"

i18n.use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: { enTranslation } },
    ru: { translation: { ruTranslation } },
    am: { translation: { amTranslation } },
  },
})

export default i18n
