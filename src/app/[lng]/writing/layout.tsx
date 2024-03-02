import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default async function WritingLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <section className="flex w-full h-full overflow-hidden">
      <EntityMenu type="writing" lng={lng} />
      <main>
        <div className="container">{children}</div>
      </main>
    </section>
  );
}
