"use client";

import { twMerge } from "tailwind-merge";
import SyntaxHighlighter from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./copy-button";

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, language, code, className = "" }) => {
  return (
    <div className={twMerge("border-x border border-gray-200 rounded-lg overflow-hidden mb-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border-b border-gray-200 bg-gray-50 py-1.5 pl-4 pr-2">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-gray-200" />
            <span className="h-4 w-4 rounded-full bg-gray-200" />
            <span className="h-4 w-4 rounded-full bg-gray-200" />
          </span>
          <p className="m-0 text-xs font-medium select-none">{title}</p>
        </div>
        <CopyButton code={code} language={language} />
      </div>
      <SyntaxHighlighter
        language={language}
        style={coy}
        showLineNumbers={true}
        customStyle={{ margin: 0, padding: 0 }}
        lineNumberStyle={{ marginRight: 4, marginBottom: 1 }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export type CodeBlockProps = {
  title: string;
  language: string;
  code: string;
  className?: string;
};
