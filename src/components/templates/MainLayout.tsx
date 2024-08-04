import type { LayoutProps } from "../../types/props";
import { SideMenu } from "../organisms/SideMenu";

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="hidden md:grid grid-cols-main min-h-screen bg-white">
      <SideMenu />
      <div>{children}</div>
    </div>
  );
}
