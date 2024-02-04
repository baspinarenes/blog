import { ContentMenu } from "@/components/content-menu";

export default function ThoughtLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <ContentMenu type="thought" />
      {children}
    </section>
  );
}
