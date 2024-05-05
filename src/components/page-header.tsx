import { headers } from "next/headers";
import { BackButton } from "./back-button";
import { useTranslation } from "@/app/i18n";
import { MobileHamburgerMenu } from "./mobile-hamburger-menu";
import { LanguageSwitcher } from "./language-switcher";
import { Language } from "@/lib/models";
import { ContentfulItemType } from "@/lib/models";
import { NAVIGATIONS } from "@/lib/constants";

export const PageHeader: React.FC<PageHeaderProps> = async (props) => {
  const { lng } = props;
  const pathname = headers().get("x-pathname")!;
  const category = pathname.split("/")[2];
  const entity = pathname.split("/")[3];
  const { t } = await useTranslation("common");
  const navigationTitle = t(`navigation.${category}`).includes(".") ? "" : t(`navigation.${category}`);
  const backLink = NAVIGATIONS.map((n) => n.id).includes(category) ? category : "";

  return (
    <>
      {/* Desktop */}
      {!entity && (!category || ["journey", "tool"].includes(category)) && (
        <h1 className="hidden lg:block mb-12 w-full max-w-4xl mx-auto">{t(`navigation.${category || "home"}`)}</h1>
      )}
      {/* Mobile */}
      <div className="flex lg:hidden sticky top-0 bg-white  z-30 h-12 p-3 border-b items-center -m-6 mb-6">
        {entity ? <BackButton to={`/${backLink}`} /> : <MobileHamburgerMenu lng={lng} />}
        {category && <div className="text-sm font-semibold ml-1">{navigationTitle}</div>}
        <LanguageSwitcher lng={lng} />
      </div>
    </>
  );
};

export type PageHeaderProps = {
  lng: Language;
};
