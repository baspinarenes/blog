import Image from "next/image";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from "rehype-prism-plus";
import Link from "next/link";
import { CodeBlock, InlineCode, Title } from "../atoms";
import { cn } from "@/libraries/utils";

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  children,
}) => {
  return (
    <Markdown
      components={{
        h1: ({ children }) => <Title level={1}>{children}</Title>,
        h2: ({ children }) => <Title level={2}>{children}</Title>,
        h3: ({ children }) => <Title level={3}>{children}</Title>,
        h4: ({ children }) => <Title level={4}>{children}</Title>,
        h5: ({ children }) => <Title level={5}>{children}</Title>,
        h6: ({ children }) => <Title level={6}>{children}</Title>,
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
                    <span className="relative z-10 dark:text-white">
                      {children}
                    </span>
                  </em>
                </p>
              </div>
            </blockquote>
          );
        },
        a: ({ href, children }) => {
          const isInternal = href!.startsWith("/");
          return isInternal ? (
            <Link href={href!} className="link">
              {children}
            </Link>
          ) : (
            <a href={href!} className="link">
              {children}
            </a>
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

          const alt = props.alt?.includes("|")
            ? props.alt.split("|")[0]
            : props.alt;
          const source = props.alt?.includes("|")
            ? props.alt.split("|")[1]
            : props.alt;

          return (
            <figure
              className={cn(
                "flex flex-col -mx-6 w-screen my-6 justify-center items-center gap-2",
                "md:w-auto sm:mx-0 sm:my-6"
              )}
            >
              <Image
                src={"https:" + props.src}
                alt={alt || ""}
                width={props.width ? Number(props.width) : 1920}
                height={props.height ? Number(props.height) : 1080}
                className={cn(
                  "flex-1 animate-reveal border-y border-gray-200",
                  "md:rounded-xl sm:border-x"
                )}
              />
              {source && (
                <figcaption className="break-all text-center text-xs font-light text-gray-500">
                  <a href={source}>{source}</a>
                </figcaption>
              )}
            </figure>
          );
        },
        code: (props) => <InlineCode {...props} />,
        pre: (props) => <CodeBlock {...props} />,
        hr: () => (
          <hr className="my-8 border-0 h-0 border-t border-t-[rgba(0, 0, 0, 0.1)]" />
        ),
        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => {
          let title = "";
          let description = children;

          if (
            Array.isArray(children) &&
            children[0].type === "strong" &&
            children[0].props.children.endsWith(":") &&
            typeof children[1] === "string"
          ) {
            title = children[0].props.children.split(":")[0];
            description = children.slice(1);
          }

          return (
            <li>
              {title && <div className="font-bold text-base">{title}</div>}
              <span>{description}</span>
            </li>
          );
        },
      }}
      remarkPlugins={[rehypeHighlight, rehypePrism]}
      className="markdown"
    >
      {children}
    </Markdown>
  );
};

export type MarkdownContentProps = {
  children: string;
};
