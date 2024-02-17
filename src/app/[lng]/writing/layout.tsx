import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default async function WritingLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <section className="flex w-full h-full">
      <EntityMenu type="writing" lng={lng} />
      {children}
    </section>
  );
}
