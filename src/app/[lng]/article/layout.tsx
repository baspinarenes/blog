import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default function ArticleLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <>
      <EntityMenu type="article" lng={lng} />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
