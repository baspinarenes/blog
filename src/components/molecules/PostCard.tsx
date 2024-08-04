import { FC } from "react";
import { Icon, ReadingTime, ViewCount } from "../atoms";
import Link from "next/link";
import { cn, formatDate } from "@/libraries/utils";
import { PostCardProps } from "@/models";

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
    <Link href={`/${language}/${category}/${slug}`}>
      <div
        className={cn(
          "flex border-b border-b-border py-3 sm:py-2 px-6 w-screen gap-3 h-full",
          "md:bg-gray-50 sm:border sm:border-gray-200 sm:rounded-lg sm:p-4 sm:w-full"
        )}
      >
        {!hideIcon && (
          <Icon
            name={category}
            size={18}
            className="flex-shrink-0 text-gray-800"
          />
        )}
        <div className="flex flex-col gap-1 -mt-1 w-full">
          <span className={cn("font-semibold text-base m-0 text-link")}>
            {title}
          </span>
          <div className="flex w-full gap-2 text-sm">
            <time className="mr-auto block">{formatDate(createdAt)}</time>
            <ViewCount count={views} />
            <ReadingTime text={readingTime} />
          </div>
        </div>
      </div>
    </Link>
  );
};
