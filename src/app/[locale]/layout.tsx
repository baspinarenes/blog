import "@/styles/globals.css";
import { SideMenu } from "@/components/side-menu";
import { MenuContent } from "@/components/menu-content";
import { DESCRIPTION, TITLE } from "@/lib/utils/constants";
import { cn } from "@/lib/utils/common";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LayoutProps } from "@/lib/models";
import { locales } from "@/config";
import { unstable_setRequestLocale } from "next-intl/server";

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
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <html lang={params.locale} className={`${openSans.variable} ${jetbrainsMono.variable}`}>
      <body className={cn("hidden lg:flex h-screen max-h-screen", openSans.className)}>
        <SideMenu>
          <MenuContent />
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
