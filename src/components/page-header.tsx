import { headers } from "next/headers";
import { BackButton } from "./back-button";
import { useTranslation } from "@/app/i18n";
import { MobileHamburgerMenu } from "./mobile-hamburger-menu";
import { LanguageSwitcher } from "./language-switcher";
import { Language } from "@/lib/models";

export const PageHeader: React.FC<PageHeaderProps> = async (props) => {
  const { lng } = props;
  const pathname = headers().get("x-pathname")!;
  const category = pathname.split("/")[2];
  const entity = pathname.split("/")[3];
  const { t } = await useTranslation("common");

  return (
    <>
      {/* Desktop */}
      {!entity && (!category || ["journey", "tool"].includes(category)) && (
        <h1 className="hidden lg:block mb-12 w-full max-w-4xl mx-auto">{t(`navigation.${category || "home"}`)}</h1>
      )}
      {/* Mobile */}
      <div className="flex lg:hidden sticky top-0 bg-white  z-30 h-12 p-3 border-b items-center -m-6 mb-6">
        {entity ? <BackButton to={`/${category}`} /> : <MobileHamburgerMenu lng={lng} />}
        {category && <div className="text-sm font-semibold ml-1">{t(`navigation.${category}`)}</div>}
        <LanguageSwitcher lng={lng} />
      </div>
    </>
  );
};

export type PageHeaderProps = {
  lng: Language;
};
