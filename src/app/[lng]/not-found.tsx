import { NotFoundContent } from "@/components/not-found";
import { PageHeader } from "@/components/page-header";
import { cookies } from "next/headers";

export default function NotFound() {
  const lng = cookies().get("i18next")?.value || "en";

  return (
    <main>
      <div className="container">
        <PageHeader lng={lng} />
        <NotFoundContent lng={lng} />
      </div>
    </main>
  );
}
