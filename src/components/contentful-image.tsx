"use client";

import Image from "next/image";
import { ContentfulImageProps } from "../lib/models";
import { contentfulLoader } from "../lib/utils/image-loaders";
import { twMerge } from "tailwind-merge";
import { memo } from "react";

const ContentfulImageRaw = (props: ContentfulImageProps) => {
  const { className, ...otherProps } = props;

  return (
    <Image
      priority
      alt={props.alt || ""}
      loading="eager"
      className={twMerge("mb-4 rounded-2xl w-full", props.className)}
      loader={contentfulLoader}
      {...otherProps}
    />
  );
};

export default memo(ContentfulImageRaw);
