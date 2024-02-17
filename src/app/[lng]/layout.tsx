import { SideMenu } from "@/components/side-menu";
import { MenuContent } from "@/components/menu-content";
import { DESCRIPTION, TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils/common";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LayoutProps } from "@/lib/models";
import { dir } from "i18next";
import "@/styles/globals.css";
import { languages } from "../i18n/settings";

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

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function LocaleLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)} className={`${openSans.variable} ${jetbrainsMono.variable}`}>
      <body className={cn("hidden lg:flex h-screen max-h-screen", openSans.className)}>
        <SideMenu>
          <MenuContent lng={lng} />
        </SideMenu>
        <main className="w-full overflow-y-auto">
          {children}
          <SpeedInsights />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
