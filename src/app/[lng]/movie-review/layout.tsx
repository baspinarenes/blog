import { EntityMenu } from "@/components/entity-menu";
import { LayoutProps } from "@/lib/models";

export default async function MovieReviewLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <>
      <EntityMenu type="movie-review" lng={lng} />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
