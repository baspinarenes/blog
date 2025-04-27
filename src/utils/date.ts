import dayjs from "dayjs";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import type { Lang } from "@models/type";

export const formatDate = (date: Date, locale: Lang, type: "short" | "long" = "long") => {
  return dayjs(date).locale(locale).format(type === "short" ? "MMM D, YYYY" : "MMMM D, YYYY");
};
