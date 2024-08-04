import { type FC } from "react";
import type { LayoutProps } from "../../types/props";
import { MobileHeader } from "../organisms";

export const MainMobileLayout: FC<LayoutProps> = ({
  children,
  params: { language },
}) => {
  return (
    <div className="flex md:hidden flex-col w-full">
      <MobileHeader language={language} />
      <div className="flex-1 px-6 bg-white">{children}</div>
    </div>
  );
};
