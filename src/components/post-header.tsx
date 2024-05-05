import { Language } from "@/lib/models";
import { Date } from "./date";

export const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const { title, createdAt, locale, readingTime, customDescription = null, tags = [] } = props;

  return (
    <div className="flex flex-col mb-6">
      <h1 className="text-pretty">{title}</h1>
      <div className="flex gap-2 text-gray-400 font-light text-sm -mt-4 lg:-mt-8">
        {customDescription}
        {!customDescription && createdAt && <Date date={createdAt} locale={locale} />}
        {!customDescription && readingTime && (
          <div className="flex gap-2">
            • <span className="text-sm text-gray-400 font-light">{readingTime}</span>
          </div>
        )}
        {!customDescription && tags.length > 0 && (
          <div className="flex gap-2">
            •{" "}
            {tags.map((tag, index) => (
              <span key={index} className="text-sm text-gray-400 font-light">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export type PostHeaderProps = {
  title: string;
  locale: Language;
  readingTime?: string;
  createdAt?: Date;
  tags?: string[];
  customDescription?: React.ReactNode;
};
