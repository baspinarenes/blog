import { Language } from "@/lib/models";
import { Date } from "./date";

export const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const { title, createdAt, locale, customDescription = null, tags = [] } = props;

  return (
    <div className="flex flex-col gap-3 mb-8">
      <h1>{title}</h1>
      <div className="flex gap-3 text-gray-400 font-light text-sm -mt-12">
        {customDescription}
        {!customDescription && createdAt && <Date date={createdAt} locale={locale} />}
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
  createdAt?: Date;
  tags?: string[];
  customDescription?: React.ReactNode;
};
