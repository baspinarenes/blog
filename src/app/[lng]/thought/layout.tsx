import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default async function ThoughtLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <>
      <EntityMenu type="thought" lng={lng} />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
