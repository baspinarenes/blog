import { formatDate } from "@/lib/utils/common";

export const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const { title, date } = props;

  return (
    <div className="flex flex-col gap-3">
      <h1>{title}</h1>
      <time dateTime={date.toString()} className="text-gray-400 font-light">
        {formatDate(date)}
      </time>
    </div>
  );
};

export type PostHeaderProps = {
  title: string;
  date: Date;
};
