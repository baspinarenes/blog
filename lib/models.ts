import * as Contentful from "contentful";

export type ContentfulImageProps = {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
};
