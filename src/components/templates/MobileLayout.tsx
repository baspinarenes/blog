import { cn } from "@/libraries/utils";
import { MobileHeader } from "../organisms/MobileHeader";
import { LayoutProps } from "@/models";

export function MobileLayout({ children, params }: LayoutProps) {
  const { language } = params;

  return (
    <div className={cn("flex flex-col w-screen")}>
      <MobileHeader language={language} />
      <div className="flex-1 px-6 bg-white overflow-y-auto">{children}</div>
    </div>
  );
}

export type MobileLayoutProps = {
  children: React.ReactNode;
};
