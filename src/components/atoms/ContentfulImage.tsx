"use client";

import { cn } from "@/libraries/utils";
import Image from "next/image";

interface ContentfulImageProps {
  src: string;
  width?: number;
  quality?: number;
  description?: string;
  [key: string]: any;
}

const contentfulLoader = ({ src, width, quality }: ContentfulImageProps) => {
  return `${src}?w=${width}&q=${quality || 100}`;
};

export function ContentfulImage({
  description,
  className,
  ...otherProps
}: ContentfulImageProps) {
  return (
    <Image
      className={cn("w-full rounded-2xl mb-6", className)}
      alt={description || ""}
      loader={contentfulLoader}
      {...otherProps}
    />
  );
}
