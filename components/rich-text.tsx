import { Options, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Document as RichTextDocument } from "@contentful/rich-text-types";
import { CodeBlock } from "./code-block";
import { dasherize } from "@/lib/utils/common";
import ContentfulImage from "./contentful-image";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <span className="font-semibold text-black">{text}</span>,
    [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
    [MARKS.CODE]: (text) => <code className="inline-code">{text}</code>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (_, children) => {
      const id = dasherize(children as string);
      const url = `h2-${id}`;
      return (
        <h2
          id={url}
          className="group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
        >
          <a href={`#${url}`} className="group-hover:underline group-hover:underline-offset-4">
            {children}
          </a>
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (_, children) => {
      const id = dasherize(children as string);
      const url = `h3-${id}`;
      return (
        <h3
          id={url}
          className="group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
        >
          <a href={`#${url}`} className="group-hover:underline group-hover:underline-offset-4">
            {children}
          </a>
        </h3>
      );
    },
    [BLOCKS.PARAGRAPH]: (_, children) => <div className="mb-4 leading-6 last:mb-0">{children}</div>,
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="mb-4 flex list-disc flex-col gap-0.5 pl-6">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="mb-4 flex list-inside list-[decimal-leading-zero] flex-col gap-2">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="my-10 flex gap-6 border-2 relative px-8 py-4 rounded-xl">
        <span className="font-mono text-3xl text-gray-400 absolute -left-[calc(10px)] top-[calc(50%-24px)] bg-white">
          &
        </span>
        <div>
          {children}
          {children}
        </div>
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const type = node.data.target.sys.contentType.sys.id;
      const fields = node.data.target.fields;
      console.log("asdas");

      switch (type) {
        case "codeBlock": {
          return <CodeBlock title={fields.title} language={fields.language} code={fields.code} />;
        }
        default:
          return null;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, details } = node.data.target.fields.file;
      const { title, description } = node.data.target.fields;

      return (
        <figure className="mb-6 flex flex-col gap-2 overflow-hidden rounded-xl">
          <ContentfulImage
            src={url}
            width={details.image.width > 600 ? 600 : details.image.width}
            height={details.image.height > 400 ? 400 : details.image.height}
            quality={100}
            alt={description || title}
          />
          {description && (
            <figcaption className="break-all text-center text-xs font-light text-gray-500">
              {description}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export const RichText: React.FC<RichTextProps> = (props) => {
  const { document } = props;
  if (!document) return null;
  return documentToReactComponents(document, options);
};

export type RichTextProps = {
  document: RichTextDocument | null;
};
