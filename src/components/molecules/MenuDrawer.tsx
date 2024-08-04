import { Navigations } from "./Navigations";
import { ProfileCard } from "./ProfileCard";
import { Socials } from "./Socials";
import { Separator } from "../ui/separator";
import { FC } from "react";

export const MenuDrawer: FC<MenuDrawerProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col px-5 pb-5 gap-4 overflow-y-auto max-h-[80vh]">
      <ProfileCard />
      <Navigations onClick={onClose} />
      <Separator />
      <Socials />
    </div>
  );
};

export type MenuDrawerProps = Readonly<{
  onClose: () => void;
}>;
