import Markdown, { Components } from "react-markdown";
import { CodeBlock } from "./code-block";
import { twMerge } from "tailwind-merge";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from "rehype-prism-plus";
import { BugIcon, QuoteIcon } from "lucide-react";
import { dasherize } from "@/lib/utils/common";
import NextImage from "next/image";
import { contentfulLoader } from "@/lib/utils/image-loaders";

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
  blockquote: ({ children }) => {
    return (
      <blockquote className="relative text-center max-w-lg mx-auto my-16 text-xl">
        <div className="relative z-10">
          <p className="text-gray-800">
            <em className="relative">
              <svg
                className="absolute -top-8 -start-8 size-16 text-gray-100 sm:h-24 sm:w-24 dark:text-gray-700"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                  fill="currentColor"
                />
              </svg>
              <span className="relative z-10 dark:text-white">{children}</span>
            </em>
          </p>
        </div>
      </blockquote>
    );
  },
  img: (props) => {
    if (props.src?.search(/\bvideo\b/) !== -1) {
      return (
        <iframe
          src={props.src}
          title={props.alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-[1920/1080] rounded-2xl"
        />
      );
    }

    return <img src={props.src} alt={props.alt} className="w-full" />;
  },
  code: ({ children, className, node, ...rest }) => {
    let match = /language-(\w+)/.test(className || "");
    const nodeInfo = node as any;
    const meta = nodeInfo?.data?.meta;
    const language = nodeInfo?.properties?.className?.[0]?.split("-")?.[1];

    if (language === "video") {
      return <div className="w-full" dangerouslySetInnerHTML={{ __html: children!.toString() }}></div>;
    }

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
  hr: () => (
    <hr className="my-8 border-0 h-0 border-t border-b border-t-[rgba(0, 0, 0, 0.1)] border-b-[rgba(255, 255, 255, 0.3)]" />
  ),
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
