import "../../styles/globals.scss";
import type { Metadata } from "next";
import { cn } from "@/libraries/utils";
import { inter, jetbrains_mono } from "@/libraries/fonts";
import { title, description } from "@/configs";
import { languages } from "@/i18n/settings";
import { DesktopLayout, MobileLayout } from "@/components/templates";
import { isMobileDevice } from "@/libraries/device";
import { LayoutProps } from "@/models";

export const metadata: Metadata = {
  title,
  description,
};

export async function generateStaticParams() {
  return languages.map((language) => ({ language }));
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const isMobile = await isMobileDevice();

  return (
    <html lang={params.language}>
      <body
        className={cn(
          "min-h-screen sm:max-h-screen bg-background font-sans antialiased flex bg-gray-50",
          inter.variable,
          jetbrains_mono.variable
        )}
      >
        {!isMobile && <DesktopLayout params={params}>{children}</DesktopLayout>}
        {isMobile && <MobileLayout params={params}>{children}</MobileLayout>}
      </body>
    </html>
  );
}
