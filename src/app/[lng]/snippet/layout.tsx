import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default function SnippetLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <section className="flex w-full h-full overflow-hidden">
      <EntityMenu type="snippet" lng={lng} />
      <main>
        <div className="container">{children}</div>
      </main>
    </section>
  );
}
