import { useSelector } from "react-redux";
import { locales } from "../locales/locales"
import { selectLocale } from "../storageSlice";

export default function getTranslation(string) {
  const locale = useSelector(selectLocale) || 'es_PE';
  return locales[locale][string];
}