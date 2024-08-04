import { type FC } from "react";
import { Navigations } from "../molecules";

export const SideMenu: FC<SideMenuProps> = () => {
  return (
    <aside className="bg-red-100">
      <Navigations />
    </aside>
  );
};

export type SideMenuProps = Readonly<{}>;
