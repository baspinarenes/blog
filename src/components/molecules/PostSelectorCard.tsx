"use client";

import { PostCardProps } from "@/models";
import { ReadingTime, ViewCount } from "../atoms";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, dasherize, formatDate } from "@/libraries/utils";

export function PostSelectorCard({
  language,
  category,
  slug,
  tags,
  title,
  readingTime,
  views,
  isDraft,
  createdAt,
}: PostCardProps) {
  const pathname = usePathname();
  const isActivePost = pathname.includes(slug);

  return (
    <Link
      href={`/${language}/${category}/${slug}`}
      className={cn(
        "flex flex-col px-3 py-2 rounded-md cursor-pointer relative",
        {
          "bg-black text-white": isActivePost,
          "hover:bg-slate-200": !isActivePost,
          "bg-red-200": isDraft,
        }
      )}
    >
      <h3 className="text-sm font-semibold m-0 break-words">{title}</h3>
      <div className="flex items-center justify-between mt-1 text-[10px]">
        <time className="mr-auto block h-fit">{formatDate(createdAt)}</time>
        <div
          className={cn("flex gap-2", {
            "text-white!": isActivePost,
          })}
        >
          <ReadingTime text={readingTime} />
          <ViewCount count={views} />
        </div>
        {/* <div className="flex gap-1 text-xs">
          {tags?.[0] && (
            <span
              className={cn(
                "text-[10px] bg-slate-300 px-1.5 py-0.5 rounded-md",
                {
                  "bg-white text-black": isActivePost,
                }
              )}
            >
              {dasherize(tags[0])}
            </span>
          )}
        </div> */}
      </div>
    </Link>
  );
}
