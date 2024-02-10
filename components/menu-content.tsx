import { LanguageSelector } from "./language-selector";
import { Navigations } from "./navigations";
import { Profile } from "./profile";
import { Socials } from "./socials";

export const MenuContent: React.FC<MenuContentProps> = (props) => {
  const {} = props;

  return (
    <div className="w-full p-3 flex flex-col gap-6">
      <Profile />
      <Navigations />
      <div className="mt-auto" />
      <LanguageSelector />
      <Socials />
      <hr className="mt-0 -mb-3" />
      <span className="text-center text-[10px] text-slate-400">Inspired by onur.dev</span>
    </div>
  );
};

export type MenuContentProps = {};
