import { cn } from "@/libraries/utils";
import "../../styles/globals.scss";
import { inter, jetbrains_mono } from "@/libraries/fonts";

export const metadata = {
  title: "@enesbaspinar/money",
  description: "Documentation for @enesbaspinar/money npm package.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", inter.variable, jetbrains_mono.variable)}
      >
        {children}
      </body>
    </html>
  );
}
