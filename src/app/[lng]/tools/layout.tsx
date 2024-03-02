import { LayoutProps } from "@/lib/models";

export default function ToolsLayout({ children }: LayoutProps) {
  return (
    <main>
      <div className="container">{children}</div>
    </main>
  );
}
