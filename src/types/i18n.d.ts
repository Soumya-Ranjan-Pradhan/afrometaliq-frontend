import "react-i18next";

declare module "react-i18next" {
  interface Resources {
    translation: typeof import("../../public/locales/en.json");
  }
}
