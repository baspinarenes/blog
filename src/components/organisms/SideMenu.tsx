import { type FC } from "react";
import {
  LanguageSwitcher,
  Navigations,
  ProfileCard,
  Socials,
} from "../molecules";
import { Separator } from "../ui/separator";
import { Copyright, Spacer } from "../atoms";

export const SideMenu: FC<SideMenuProps> = ({ language }) => {
  return (
    <aside className="flex flex-col gap-4 max-h-screen border-r border-border bg-gray-50 p-4 pt-8">
      <ProfileCard />
      <Spacer height={1} />
      <Navigations language={language} />
      <Spacer />
      <Separator />
      <Socials />
      <Spacer height={1} />
      <Copyright />
    </aside>
  );
};

export type SideMenuProps = Readonly<{
  language: string;
}>;
