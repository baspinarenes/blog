import { NotFoundContent } from "@/components/not-found";
import { PageHeader } from "@/components/page-header";

export default function NotFound() {
  return (
    <main>
      <div className="container">
        <PageHeader lng="en" />
        <NotFoundContent lng={"en"} />
      </div>
    </main>
  );
}
