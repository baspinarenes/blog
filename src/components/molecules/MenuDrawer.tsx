import { Separator } from "../ui/separator";
import { FC } from "react";
import { ProfileCard } from "./ProfileCard";
import { Navigations } from "./Navigations";
import { Socials } from "./Socials";

export const MenuDrawer: FC<MenuDrawerProps> = ({ language, onClose }) => {
  return (
    <div className="flex flex-col px-5 pb-5 gap-4 overflow-y-auto max-h-[80vh]">
      <ProfileCard />
      <Navigations language={language} onClick={onClose} />
      <Separator />
      <Socials />
    </div>
  );
};

export type MenuDrawerProps = Readonly<{
  language: string;
  onClose: () => void;
}>;
