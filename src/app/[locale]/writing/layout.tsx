import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function WritingLayout({ children, params }: LayoutProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <section className="flex w-full h-full">
      <EntityMenu type="writing" locale={params.locale} />
      {children}
    </section>
  );
}
