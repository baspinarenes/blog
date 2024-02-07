import { Options, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Document as RichTextDocument } from "@contentful/rich-text-types";
import { CodeBlock } from "./code-block";
import { dasherize } from "@/lib/utils/common";
import ContentfulImage from "./contentful-image";
import { AlertCircleIcon, InfoIcon, Link2Icon, SkullIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "./link";
import { Table, TableCell, TableHead, TableRow } from "./ui/table";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <span className="font-semibold text-black">{text}</span>,
    [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
    [MARKS.CODE]: (text) => <code className="inline-code">{text}</code>,
  },
  renderNode: {
    [BLOCKS.HR]: () => <Separator className="my-10" />,
    [BLOCKS.TABLE]: (a, children) => {
      return <Table className="font-medium text-gray-500">{children}</Table>;
    },
    [BLOCKS.TABLE_CELL]: (_, children) => <TableCell>{children}</TableCell>,
    [BLOCKS.TABLE_ROW]: (_, children) => (
      <TableRow className="hover:bg-transparent text-sm">{children}</TableRow>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_, children) => {
      return <TableHead className="text-sm">{children}</TableHead>;
    },
    [BLOCKS.HEADING_2]: (_, children) => {
      const id = dasherize(children as string);
      const url = `h2-${id}`;
      return (
        <h2
          id={url}
          className="group relative mb-8 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
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

      switch (type) {
        case "codeBlock": {
          return <CodeBlock title={fields.title} language={fields.language} code={fields.code} />;
        }
        case "messageBox": {
          const options = {
            info: {
              textColor: "text-blue-600",
              borderColor: "border-blue-600",
              icon: InfoIcon,
            },
            warning: {
              textColor: "text-yellow-600",
              borderColor: "border-yellow-600",
              icon: AlertCircleIcon,
            },
            danger: {
              textColor: "text-red-600",
              borderColor: "border-red-600",
              icon: SkullIcon,
            },
          }[fields.type as string]!;

          return (
            <Card className={options.borderColor}>
              <CardContent className={`${options.textColor} inline-flex gap-4 p-4`}>
                <options.icon className={`inline-block flex-shrink-0`} />
                <p className="m-0 inline-block">{fields.content}</p>
              </CardContent>
            </Card>
          );
        }
        default:
          return null;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { description, file } = node.data.target.fields;
      const { url, details } = file;

      return (
        <figure className="my-10 flex flex-col justify-center items-center gap-2">
          <ContentfulImage
            src={url}
            width={details.image.width}
            height={details.image.height}
            quality={100}
            className="w-full overflow-hidden rounded-xl"
          />
          {description && (
            <figcaption className="break-all text-center text-xs font-light text-gray-500">
              <a href={description}>{description}</a>
            </figcaption>
          )}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => <Link href={node.data.uri}>{children}</Link>,
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
