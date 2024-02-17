import Markdown, { Components } from "react-markdown";
import { CodeBlock } from "./code-block";
import remarkCodeTitle from "remark-code-title";
import { twMerge } from "tailwind-merge";
import { MessageBox } from "./message-box";

const components: Partial<Components> = {
  h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4">{children}</h2>,
  ul: ({ children }) => <ul className="mb-4 flex list-disc flex-col gap-2 pl-6">{children}</ul>,
  code: ({ children, className, node, ...rest }) => {
    const match = /language-(\w+)/.exec(className || "");

    return match ? (
      <CodeBlock title={(node as any)?.data?.meta ?? ""} language={"javascript"} code={children as any} />
    ) : (
      <code {...rest} className={twMerge(className, "inline-code")}>
        {children}
      </code>
    );
  },
};

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ children }) => {
  return (
    <Markdown components={components} remarkPlugins={[remarkCodeTitle]}>
      {children}
    </Markdown>
  );
};

export type MarkdownContentProps = {
  children: string | null | undefined;
};
