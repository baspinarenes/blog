import { ContentMenu } from "@/components/content-menu";

export default function SnippetLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <ContentMenu type="snippet" />
      {children}
    </section>
  );
}
