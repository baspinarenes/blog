import { Language } from "@/lib/models";
import { formatDate } from "@/lib/utils";

export const Date: React.FC<DateProps> = ({ date, locale }) => {
  return <time dateTime={date.toString()}>{formatDate(date, locale)}</time>;
};

export type DateProps = {
  date: Date;
  locale: Language;
};
