"use client";

import Image from "next/image";
import { ContentfulImageProps } from "../lib/models";
import { contentfulLoader } from "../lib/utils/image-loaders";

export default function ContentfulImage(props: ContentfulImageProps) {
  return <Image alt={props.alt} loader={contentfulLoader} {...props} />;
}
