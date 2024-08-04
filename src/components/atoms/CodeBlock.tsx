"use client";

import { ClassAttributes, HTMLAttributes, type FC } from "react";
import { Icon } from "./Icon";
import { ExtraProps } from "react-markdown";
import { CopyButton } from "./CopyButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getSafe } from "@/lib/utils";

export const CodeBlock: FC<CodeBlockProps> = ({
  children,
  className,
  node,
  lang,
  ...rest
}) => {
  const language = getSafe(
    () => (node as any).children[0].properties.className[0].split("-")[1],
    ""
  );

  const code = (node as any).children[0].children[0].value.trim();
  const fileName = "";

  if (language === "") {
    // Test it
    <div className="code-plain">
      {/* <Highlight className={language}>{children}</Highlight> */}
    </div>;
  }

  if (language === "result") {
    return (
      <div className="code-result">
        {/* <Highlight className={language}>{children}</Highlight> */}
        <div className="absolute bottom-4 right-4 z-10 text-gray-300">
          <Icon name="bug" size={22} />
        </div>
      </div>
    );
  }

  return (
    <div className="code-block flex flex-col w-full border border-border rounded-lg mt-6 mb-8 overflow-hidden">
      <div className="flex items-center justify-center bg-[#f9fafb] py-2 px-4 border-b border-b-border">
        <div className="flex gap-1 mr-3">
          <span className="inline-block w-4 h-4 rounded-full bg-gray-200" />
          <span className="inline-block w-4 h-4 rounded-full bg-gray-200" />
          <span className="inline-block w-4 h-4 rounded-full bg-gray-200" />
        </div>
        <span className="text-sm mr-auto bg-gray-700">{fileName}</span>
        <CopyButton text={code} />
        <div className="empty:hidden ml-3">
          <Icon name={language} size={20} />
        </div>
      </div>
      <SyntaxHighlighter language={language} style={theme} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export type CodeBlockProps = Readonly<
  ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps
>;

/*
 let match = /language-(\w+)/.test(className || "");
    const nodeInfo = node as any;
    const meta = nodeInfo?.data?.meta;
    const language = nodeInfo?.properties?.className?.[0]?.split("-")?.[1];

    if (language === "video") {
      return (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: children!.toString() }}
        ></div>
      );
    }

    if (language === "result") {
      return (
        <code className={twMerge("code-result relative !pr-9")}>
          <div className="text-ellipsis">{children}</div>
          <IconBug
            size={20}
            className="absolute right-2 top-[10px] text-slate-400"
          />
        </code>
      );
    }

    // if (match) {
    //   return (
    //     <CodeBlock
    //       className={className}
    //       title={meta ?? ""}
    //       language={language ?? "js"}
    //       code={children as any}
    //     />
    //   );
    // }

    return (
      <code {...rest} className={twMerge(className, "inline-code")}>
        {children}
      </code>
    );

*/
