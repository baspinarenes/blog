import { Language } from "@/lib/models";
import { Navigations } from "./navigations";
import { Profile } from "./profile";
import { Socials } from "./socials";
import { LanguageSwitcher } from "./language-switcher";

export const MenuContent: React.FC<MenuContentProps> = ({ lng }) => {
  return (
    <div className="w-full p-3 flex flex-col gap-6">
      <Profile />
      <Navigations lng={lng} />
      <div className="mt-auto" />
      <Socials />
      <LanguageSwitcher lng={lng} />
      <span className="text-center text-[10px] text-slate-400">Inspired by onur.dev</span>
    </div>
  );
};

export type MenuContentProps = {
  lng: Language;
};
