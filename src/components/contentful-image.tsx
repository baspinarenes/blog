"use client";

import Image from "next/image";
import { ContentfulImageProps } from "../lib/models";
import { contentfulLoader } from "../lib/utils/image-loaders";

export default function ContentfulImage(props: ContentfulImageProps) {
  return (
    <Image alt={props.alt} loading="eager" className="w-full mb-12 rounded-2xl" loader={contentfulLoader} {...props} />
  );
}
