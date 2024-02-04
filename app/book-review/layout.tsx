import { ContentMenu } from "@/components/content-menu";

export default function BookReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <ContentMenu type="book-review" />
      {children}
    </section>
  );
}
