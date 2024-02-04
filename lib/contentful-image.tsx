"use client";

import Image from "next/image";
import { ContentfulImageProps } from "./models/contentful";
import { contentfulLoader } from "./utils/image-loaders";

export default function ContentfulImage(props: ContentfulImageProps) {
  return <Image alt={props.alt} loader={contentfulLoader} {...props} />;
}
