import dayjs from "dayjs";
import "dayjs/locale/tr";

export const formatDate = (date: Date, type: "short" | "long" = "long") => {
  return dayjs(date)
    .locale("tr")
    .format(type === "short" ? "MMM D, YYYY" : "MMMM D, YYYY");
};
