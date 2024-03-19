"use client";

import Image from "next/image";
import { ContentfulImageProps } from "../lib/models";
import { contentfulLoader } from "../lib/utils/image-loaders";
import { twMerge } from "tailwind-merge";

export default function ContentfulImage(props: ContentfulImageProps) {
  const {className, ...otherProps} = props;

  return (
    <Image alt={props.alt} loading="eager" className={twMerge("w-full mb-12 rounded-2xl", props.className)} loader={contentfulLoader} {...otherProps} />
  );
}