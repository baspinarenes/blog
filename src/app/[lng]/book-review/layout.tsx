import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default async function BookReviewLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <section className="flex w-full h-full">
      <EntityMenu type="bookReview" lng={lng} />
      {children}
    </section>
  );
}
