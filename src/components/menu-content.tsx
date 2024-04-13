import { Language } from "@/lib/models";
import { Navigations } from "./navigations";
import { Profile } from "./profile";
import { Socials } from "./socials";
import { LanguageSwitcher } from "./language-switcher";
import { Copyright } from "./copyright";

export const MenuContent: React.FC<MenuContentProps> = ({ lng }) => {
  return (
    <div className="w-full p-3 flex flex-col gap-6 overflow-y-auto no-scrollbar">
      <Profile />
      <Navigations lng={lng} />
      <div className="hidden lg:block mt-auto" />
      <hr />
      <Socials />
      <div className="hidden lg:block">
        <LanguageSwitcher lng={lng} />
      </div>
      <Copyright />
    </div>
  );
};

export type MenuContentProps = {
  lng: Language;
};
