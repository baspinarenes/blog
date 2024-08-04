import { FC } from "react";
import { Post } from "@/models/types";
import { PostCard } from "../molecules";

export const PostCardList: FC<PostCardListProps> = ({
  language,
  entries,
  hideIcons = false,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-3 -mx-6 sm:mx-0">
      {entries.map((entry) => (
        <PostCard
          key={entry.slug}
          language={language}
          hideIcon={hideIcons}
          {...entry}
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
