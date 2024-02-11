import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function BookReviewLayout({ children, params }: LayoutProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <section className="flex w-full h-full">
      <EntityMenu type="bookReview" locale={params.locale} />
      {children}
    </section>
  );
}
