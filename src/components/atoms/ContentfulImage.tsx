"use client";

import Image from "next/image";

interface ContentfulImageProps {
  src: string;
  width?: number;
  quality?: number;
  description?: string;
  [key: string]: any;
}

const contentfulLoader = ({ src, width, quality }: ContentfulImageProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  return (
    <Image alt={props.description || ""} loader={contentfulLoader} {...props} />
  );
}
