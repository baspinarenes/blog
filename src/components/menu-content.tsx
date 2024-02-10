import { LocaleSwitcher } from "./locale-switcher";
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
      <Socials />
      <LocaleSwitcher />
      <span className="text-center text-[10px] text-slate-400">Inspired by onur.dev</span>
    </div>
  );
};

export type MenuContentProps = {};
