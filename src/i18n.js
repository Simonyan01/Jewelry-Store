import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import i18n from "i18next"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    supportedLngs: ["en", "ru", "am"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          composet: "COMPOSET",
          search: "Search",
          wishlist: "Wishlist",
          bag: "Bag",
          my_account: "MY ACCOUNT",
        },
      },
      ru: {
        translation: {
          composet: "Компосет",
          search: "Поиск",
          wishlist: "Список желаний",
          bag: "Корзина",
          my_account: "Мой аккаунт",
        },
      },
      am: {
        translation: {
          composet: "Կոմպոսետ",
          search: "Որոնում",
          wishlist: "Հավանած",
          bag: "Զամբյուղ",
          my_account: "Իմ հաշիվը",
        },
      },
    },
  })

export default i18n
