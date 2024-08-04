import { type FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

export const InlineCode: FC<InlineCodeProps> = ({ children }) => {
  return (
    <SyntaxHighlighter style={coy}>{children as string}</SyntaxHighlighter>
  );
};

export type InlineCodeProps = Readonly<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>;
