import { formatDate } from "@/lib/utils/common";

export const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const { title, createdAt, tags = [] } = props;

  return (
    <div className="flex flex-col gap-3 mb-8">
      <h1>{title}</h1>
      <div className="flex gap-3 text-gray-400 font-light text-sm">
        <time dateTime={createdAt.toString()}>{formatDate(createdAt)}</time>
        {tags.length > 0 && (
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
  createdAt: Date;
  tags?: string[];
};
