import { AUTHOR } from "@/lib/constants";

import { HomeTable } from "@/components/home-table";
import { useTranslation } from "../i18n";
import { PageProps } from "@/lib/models";

export default async function HomePage({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, "home");

  return (
    <div className="container mx-auto">
      <h1 className="mb-8">{t("title")}</h1>
      <p>{t("description", { name: AUTHOR.name, age: AUTHOR.age })}</p>
      <HomeTable lng={lng} />
    </div>
  );
}
