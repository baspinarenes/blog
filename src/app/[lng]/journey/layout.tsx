import { LayoutProps } from "@/lib/models";

export default function JourneyLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <main>
      <div className="container">{children}</div>
    </main>
  );
}
