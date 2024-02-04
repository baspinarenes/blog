import "@/styles/globals.css";
import { SideMenu } from "@/components/side-menu";
import { MenuContent } from "@/components/menu-content";
import { DESCRIPTION, TITLE } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

const font = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className={cn("hidden lg:flex h-screen max-h-screen", font.className)}>
        <SideMenu>
          <MenuContent />
        </SideMenu>
        {children}
        {/* <div className="w-full px-7 py-24 overflow-y-scroll">
          <main className="mx-auto max-w-[48rem]">{children}</main>
        </div> */}
      </body>
    </html>
  );
}
