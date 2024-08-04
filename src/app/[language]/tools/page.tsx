import { MarkdownContent } from "@/components/molecules/MarkdownContent";
import { getStaticPage } from "@/lib/api";
import type { CategoryPageProps } from "../../../types/props";
import { draftMode } from "next/headers";

export default async function Page({
  params: { language },
}: CategoryPageProps) {
  const { isEnabled } = draftMode();
  const toolsContent = await getStaticPage({
    slug: "tools",
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  return (
    <div className="mt-6">
      <MarkdownContent>{toolsContent}</MarkdownContent>
    </div>
  );
}
