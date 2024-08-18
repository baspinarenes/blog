"use client";

import { ClassAttributes, HTMLAttributes, type FC } from "react";
import { ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Icon } from "./Icon";
import { cn, getSafe, parseCodeBlockMeta } from "@/libraries/utils";
import { CopyButton } from "../molecules";
import { MessageBox } from "../molecules/MessageBox";

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

  const code = getSafe(
    () => (node as any).children[0].children[0].value.trim(),
    ""
  );
  const { fileName, type } = parseCodeBlockMeta(node as any);

  if (["info", "warning", "danger"].includes(language)) {
    return <MessageBox type={language}>{code}</MessageBox>;
  }

  if (language === "") {
    // Test it
    return (
      <div className="code-plain">
        {/* <Highlight className={language}>{children}</Highlight> */}
      </div>
    );
  }

  if (language === "result") {
    return (
      <div
        className={cn(
          "result-block mb-8 -mx-6 sm:mx-0 w-screen sm:w-full relative border-b border-x border-border rounded-b-lg",
          {
            "bg-slate-100": !type || type === "info",
            "bg-red-50": type === "error",
          }
        )}
      >
        <SyntaxHighlighter
          language={language}
          style={theme}
          codeTagProps={{ alt: "custom-result" }}
        >
          {code}
        </SyntaxHighlighter>
        <div
          className={cn(
            "absolute z-50 bg-transparent top-px right-0 bottom-3 pt-[0.35rem] pr-2 w-12 text-gray-300 flex justify-end items-start",
            {
              "bg-slate-100": !type || type === "info",
              "bg-red-50": type === "error",
            }
          )}
        >
          <Icon name="bug" size={28} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "code-block -mx-6 w-screen flex flex-col border border-border my-6 overflow-hidden last:mb-0",
        "md:mx-0 sm:w-full sm:rounded-lg sm:border-x sm:mt-6 sm:mb-6"
      )}
    >
      <div
        className={cn(
          "w-full flex items-center justify-center bg-[#f9fafb] py-2 px-4 border-b border-b-border"
        )}
      >
        <div className="flex gap-1 mr-3">
          <span className="inline-block w-4 h-4 rounded-full bg-gray-200" />
          <span className="inline-block w-4 h-4 rounded-full bg-gray-200" />
          <span className="inline-block w-4 h-4 rounded-full bg-gray-200" />
        </div>
        <span className="text-sm mr-auto text-gray-700">{fileName}</span>
        <CopyButton text={code} />
        <div className="empty:hidden ml-3">
          <Icon name={language} size={20} />
        </div>
      </div>
      <SyntaxHighlighter
        codeTagProps={{ alt: "custom-code" }}
        language={language}
        style={theme}
        showLineNumbers
      >
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
