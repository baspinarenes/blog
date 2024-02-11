import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default function ArticleLayout({ children, params }: LayoutProps) {
  return (
    <section className="flex w-full h-full">
      <EntityMenu type="article" locale={params.locale} />
      {children}
    </section>
  );
}
