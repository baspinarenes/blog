import { SideMenu } from "@/components/side-menu";
import { MenuContent } from "@/components/menu-content";
import { DESCRIPTION, SITE_URL, TITLE } from "@/lib/constants";
import { cn, undasherize } from "@/lib/utils";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LayoutProps } from "@/lib/models";
import { dir } from "i18next";
import "@/styles/globals.css";
import { languages } from "../i18n/settings";
import { MobileHamburgerMenu } from "@/components/mobile-hamburger-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { BackButton } from "@/components/back-button";
import { useTranslation } from "../i18n";

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

export default async function LocaleLayout({ children, params: { lng } }: LayoutProps) {
  const pathname = headers().get("x-pathname")!;

  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className={`${openSans.variable} ${jetbrainsMono.variable} lg:overflow-hidden relative`}
    >
      <body
        suppressHydrationWarning
        className={cn("flex flex-col lg:flex-row h-screen max-h-screen relative", openSans.className)}
      >
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
