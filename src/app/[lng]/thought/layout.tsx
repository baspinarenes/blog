import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default async function ThoughtLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <section className="flex w-full h-full">
      <EntityMenu type="thought" lng={lng} />
      {children}
    </section>
  );
}
