import { LayoutProps } from "@/models";
import { SideMenu } from "../organisms";
import { cn } from "@/libraries/utils";

export function DesktopLayout({ children, params }: LayoutProps) {
  return (
    <div className="grid grid-cols-main gap-x-10 sm:w-full sm:gap-x-0 min-h-screen overflow-hidden bg-white">
      <SideMenu language={params.language} />
      <div
        className={cn(
          "w-full pt-8 pb-8",
          "md:max-h-screen sm:p-0 sm:overflow-hidden"
        )}
      >
        {/* className="md:max-w-3xl sm:mx-auto sm:h-full sm:min-h-full" */}
        <main className="md:h-screen">{children}</main>
      </div>
    </div>
  );
}
