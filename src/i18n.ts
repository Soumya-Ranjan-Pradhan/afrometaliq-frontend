"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Load translations via HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Default language
    debug: true, // Logs info for debugging
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Language files path
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
    },
  });

export default i18n;
