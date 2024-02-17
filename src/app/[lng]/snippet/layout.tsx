import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default function SnippetLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <section className="flex w-full h-full">
      <EntityMenu type="snippet" lng={lng} />
      {children}
    </section>
  );
}
