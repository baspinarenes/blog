import { SideMenu } from "@/components/side-menu";
import { MenuContent } from "@/components/menu-content";
import { DESCRIPTION, SITE_URL, TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils/common";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LayoutProps } from "@/lib/models";
import { dir } from "i18next";
import "@/styles/globals.css";
import { languages } from "../i18n/settings";

export const metadata = {
  title: {
    template: `%s — ${TITLE}`,
    default: TITLE,
  },
  metadataBase: new URL(SITE_URL),
  description: DESCRIPTION,
  openGraph: {
    title: {
      template: `%s — ${TITLE}`,
      default: TITLE,
    },
    description: DESCRIPTION,
    alt: TITLE,
    type: "website",
    url: "/",
    siteName: TITLE,
    locale: "en_IE",
  },
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
    <html lang={lng} dir={dir(lng)} className={`${openSans.variable} ${jetbrainsMono.variable} overflow-hidden`}>
      <div
        className={cn("flex lg:hidden flex-col gap-8 h-screen w-screen items-center justify-center p-8 text-center")}
      >
        <img
          alt="Profile img"
          src="/images/scream.png"
          width={128}
          height={128}
          loading="eager"
          fetchPriority="high"
          className="w-32 h-32 animate-scream"
        />
        Please use desktop. 90% of the information read on mobile is forgotten within 2 hours. Maybe not. Actually, I
        was too lazy to code the mobile site. Come on, switch on your computer.
      </div>
      <body className={cn("hidden lg:flex h-screen max-h-screen", openSans.className)}>
        <SideMenu>
          <MenuContent lng={lng} />
        </SideMenu>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
