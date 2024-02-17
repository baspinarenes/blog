import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default function ArticleLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <section className="flex w-full h-full">
      <EntityMenu type="article" lng={lng} />
      {children}
    </section>
  );
}
