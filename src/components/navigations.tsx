import { NAVIGATIONS } from "@/lib/constants";
import { Navlink } from "./navlink";
import { useTranslation } from "@/app/i18n";
import { Language } from "@/lib/models";

export const Navigations: React.FC<NavigationsProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng, "common");

  return (
    <div className="flex flex-col gap-1">
      {NAVIGATIONS.filter(nav => !nav.location || nav.location === lng ).map((nav) => {
        const iconComponent = <nav.icon size={16} />;

        return (
          <Navlink key={`/${lng}${nav.href}`} href={nav.href} icon={iconComponent} rounded>
            {t(`navigation.${nav.id}`)}
          </Navlink>
        );
      })}
    </div>
  );
};

export type NavigationsProps = {
  lng: Language;
};
