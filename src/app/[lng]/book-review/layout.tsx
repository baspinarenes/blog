import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default async function BookReviewLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <>
      <EntityMenu type="book-review" lng={lng} />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
