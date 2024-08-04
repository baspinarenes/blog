import { type FC } from "react";

export const Paragraph: FC<ParagraphProps> = ({ children }) => {
  return <p className="text-base mb-6">{children}</p>;
};

export type ParagraphProps = Readonly<{
  children: string;
}>;
