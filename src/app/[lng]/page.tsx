import { AUTHOR } from "@/lib/constants";

import { HomeTable } from "@/components/home-table";
import { useTranslation } from "../i18n";
import { PageProps } from "@/lib/models";

export default async function HomePage({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, "home");

  return (
    <main>
      <div className="container">
        <h1>{t("title")}</h1>
        <p>{t("description", { name: AUTHOR.name, age: AUTHOR.age })}</p>
        <HomeTable lng={lng} />
      </div>
    </main>
  );
}
