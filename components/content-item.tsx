import { Navlink } from "./navlink";

export const ContentItem: React.FC<ContentItemProps> = (props) => {
  const { title, type, index, description } = props;

  return (
    <Navlink href={`/${type}/${index}`} rounded>
      <div className="flex flex-col gap-1 px-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </Navlink>
  );
};

export type ContentItemProps = {
  title: string;
  type: string;
  description: string;
  index: number;
};
