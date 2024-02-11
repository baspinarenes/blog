import { SelectContentInfo } from "@/components/select-content-info";
import { PageProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";

export default function ArticlePage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <div className="container mx-auto">
      <SelectContentInfo />
    </div>
  );
}
