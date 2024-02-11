import { Document } from "@contentful/rich-text-types";
import { MessageBox } from "./message-box";
import { RichText } from "./rich-text";
import { getTranslations } from "next-intl/server";

export const PostContent: React.FC<PostContentProps> = async (props) => {
  const { document } = props;
  const t = await getTranslations("Common");

  if (!document) return <MessageBox type="danger" content={t("not-available-in-this-language")} />;

  return <RichText document={document} />;
};

export type PostContentProps = {
  document: Document | null;
};
