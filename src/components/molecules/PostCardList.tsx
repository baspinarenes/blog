import { FC } from "react";
import { PostCard } from "../atoms";
import { Post } from "@/types/contentful";

export const PostCardList: FC<PostCardListProps> = ({
  language,
  entries,
  hideIcons = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {entries.map((entry) => (
        <PostCard
          key={entry.slug}
          language={language}
          {...entry}
          hideIcon={hideIcons}
        />
      ))}
    </div>
  );
};

export type PostCardListProps = Readonly<{
  language: string;
  hideIcons?: boolean;
  entries: Post[];
}>;
