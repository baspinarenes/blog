import Markdown, { Components } from "react-markdown";
import { CodeBlock } from "./code-block";
import { twMerge } from "tailwind-merge";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from "rehype-prism-plus";
import { BugIcon } from "lucide-react";
import { dasherize } from "@/lib/utils/common";

const components: Partial<Components> = {
  h2: ({ children }) => {
    const id = dasherize(children as string);
    return (
      <h2 id={id} className="group relative cursor-pointer before:absolute before:-left-4 hover:before:content-['#']">
        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = dasherize(children as string);
    return (
      <h3 id={id} className="group relative cursor-pointer before:absolute before:-left-4 hover:before:content-['#']">
        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
          {children}
        </a>
      </h3>
    );
  },
  code: ({ children, className, node, ...rest }) => {
    let match = /language-(\w+)/.test(className || "");
    const nodeInfo = node as any;
    const meta = nodeInfo?.data?.meta;
    const language = nodeInfo?.properties?.className?.[0]?.split("-")?.[1];

    if (language === "result") {
      return (
        <code className={twMerge("code-result relative !pr-9")}>
          <div className="text-ellipsis">{children}</div>
          <BugIcon size={20} className="absolute right-2 top-[10px] text-slate-400" />
        </code>
      );
    }

    if (match) {
      return <CodeBlock className={className} title={meta ?? ""} language={language ?? "js"} code={children as any} />;
    }

    return (
      <code {...rest} className={twMerge(className, "inline-code")}>
        {children}
      </code>
    );
  },
};

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ children }) => {
  return (
    <Markdown components={components} remarkPlugins={[rehypeHighlight, rehypePrism]} className="markdown">
      {children}
    </Markdown>
  );
};

export type MarkdownContentProps = {
  children: string | null | undefined;
};
