import { formatDate } from "@/lib/utils";
import { Navlink } from "./navlink";

export const ContentItem: React.FC<ContentItemProps> = (props) => {
  const { title, slug, tag, createdAt, readingTime, lng } = props;

  return (
    <Navlink href={slug} rounded>
      <div className="flex flex-col gap-1 px-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-sm text-slate-400">
          {formatDate(createdAt, lng)} {readingTime ? `• ${readingTime}` : ""} {tag ? `• #${tag}` : ""}
        </span>
      </div>
    </Navlink>
  );
};

export type ContentItemProps = {
  lng: string;
  title: string;
  slug: string;
  tag: string;
  createdAt: Date;
  readingTime?: number;
};
