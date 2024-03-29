import { ContentfulItemType } from "@/lib/models";
import { Navlink } from "./navlink";

export const ContentItem: React.FC<ContentItemProps> = (props) => {
  const { title, slug, tag, description } = props;

  return (
    <Navlink href={slug} rounded>
      <div className="flex flex-col gap-1 px-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-sm text-slate-400">
          {description} {tag ? `• #${tag}` : ""}
        </span>
      </div>
    </Navlink>
  );
};

export type ContentItemProps = {
  title: string;
  slug: string;
  tag: string;
  description: string;
};
