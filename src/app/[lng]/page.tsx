import { AUTHOR, SITE_URL } from "@/lib/constants";
import { HomeTable } from "@/components/home-table";
import { useTranslation } from "../i18n";
import { PageProps } from "@/lib/models";
import { HomeTableMobile } from "@/components/home-table-mobile";
import { PageHeader } from "@/components/page-header";

export default async function HomePage({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, "home");

  return (
    <main>
      <div className="container">
        <PageHeader lng={lng} />
        <img
          alt="Scream img"
          src={`${SITE_URL}/images/scream.png`}
          width={128}
          height={128}
          loading="eager"
          fetchPriority="high"
          className="block lg:hidden w-32 h-32 mx-auto mb-8 animate-scream"
        />
        <p className="text-justify">{t("description", { name: AUTHOR.name, age: AUTHOR.age })}</p>
        <HomeTable lng={lng} />
        <HomeTableMobile lng={lng} />
      </div>
    </main>
  );
}
