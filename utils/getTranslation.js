import { locales } from "../locales/locales"

export default function getTranslation(string, locale = 'es_PE') {
  return locales[locale][string];
}