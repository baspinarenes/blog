import { ContentMenu } from "@/components/content-menu";

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <ContentMenu type="article" />
      {children}
    </section>
  );
}
