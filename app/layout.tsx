import "@/styles/globals.css";
import { SideMenu } from "@/components/side-menu";
import { MenuContent } from "@/components/menu-content";
import { DESCRIPTION, TITLE } from "@/lib/utils/constants";
import { cn } from "@/lib/utils/common";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${jetbrainsMono.variable}`}>
      <body className={cn("hidden lg:flex h-screen max-h-screen", openSans.className)}>
        <SideMenu>
          <MenuContent />
        </SideMenu>
        <main className="w-full overflow-y-auto">
          {children}
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
