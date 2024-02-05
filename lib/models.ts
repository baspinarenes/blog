export type ContentfulImageProps = {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
};

export enum PageType {
  HOME,
  WRITING,
  POST,
  NOT_FOUND,
  UNDEFINED,
  SNIPPET,
}
