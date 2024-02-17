import { Document } from "@contentful/rich-text-types";
import { MessageBox } from "./message-box";
import { RichText } from "./rich-text";
import { useTranslation } from "@/app/i18n";
import { Language } from "@/lib/models";

export const PostContent: React.FC<PostContentProps> = async ({ document, lng }) => {
  const { t } = await useTranslation(lng, "common");

  if (!document) return <MessageBox type="danger" content={t("not-available-in-this-language")} />;

  return <RichText document={document} />;
};

export type PostContentProps = {
  document: Document | null;
  lng: Language;
};
