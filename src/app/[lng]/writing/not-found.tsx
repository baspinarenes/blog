import { ChooseContentPlaceholder } from "@/components/choose-content-placeholder";
import { PageHeader } from "@/components/page-header";
import { cookies } from "next/headers";

export default function NotFound() {
  const lng = cookies().get("i18next")?.value || "en";

  return (
    <div>
      <PageHeader lng={lng} />
      <ChooseContentPlaceholder lng={lng} />
    </div>
  );
}
