import { FC } from "react";
import { Icon } from "./Icon";
import { ViewCount } from "./ViewCount";
import { ReadingTime } from "./ReadingTime";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { PostCardProps } from "../../types/props";

export const PostCard: FC<PostCardProps> = ({
  language,
  category,
  title,
  slug,
  createdAt,
  views,
  readingTime,
  hideIcon = false,
}) => {
  return (
    <div className="flex gap-3 border-b border-b-border py-4 px-6 -mx-6">
      {!hideIcon && (
        <Icon name={category} size={18} className="flex-shrink-0" />
      )}
      <div className="flex flex-col gap-1 -mt-1 w-full">
        <Link
          href={`/${language}/${category}/${slug}`}
          className="text-base m-0 text-link font-semibold"
        >
          {title}
        </Link>
        <div className="flex gap-2 text-sm text-gray-600">
          <time className="mr-auto">{formatDate(createdAt)}</time>
          <ViewCount count={views} />
          <ReadingTime time={readingTime} />
        </div>
      </div>
    </div>
  );
};
