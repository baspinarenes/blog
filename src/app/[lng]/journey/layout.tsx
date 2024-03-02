import { LayoutProps } from "@/lib/models";

export default function JourneyLayout({ children }: LayoutProps) {
  return (
    <main>
      <div className="container">{children}</div>
    </main>
  );
}
