import { getLocale } from "../plugins/vueI18n";

export function formatDate(date) {
  console.log(date);
  return new Intl.DateTimeFormat(getLocale(), {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}
