import { EntityMenu } from "@/components/entity-menu";
import { PageHeader } from "@/components/page-header";
import { LayoutProps } from "@/lib/models";

export default async function ArticleLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <>
      <EntityMenu type="article" lng={lng} />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
