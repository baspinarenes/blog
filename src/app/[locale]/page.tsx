import { AUTHOR } from "@/lib/utils/constants";
import { useTranslations } from "next-intl";
import { HomeTable } from "@/components/home-table";
import { unstable_setRequestLocale } from "next-intl/server";

export default function HomePage({ params: { locale } }: HomePageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");

  return (
    <div className="container mx-auto">
      <h1 className="mb-8">{t("title")}</h1>
      <p>{t("description", { name: AUTHOR.name, age: AUTHOR.age })}</p>
      <HomeTable />
    </div>
  );
}

type HomePageProps = {
  params: { locale: string };
};
