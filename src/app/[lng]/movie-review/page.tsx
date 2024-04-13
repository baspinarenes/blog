import { EntitiesForMobile } from "@/components/entities-for-mobile";
import { PageHeader } from "@/components/page-header";
import { SelectContentInfo } from "@/components/select-content-info";
import { PageProps } from "@/lib/models";

export default function MovieReviewPage({ params: { lng } }: PageProps) {
  return (
    <div>
      <PageHeader lng={lng} />
      <SelectContentInfo lng={lng} />
      <EntitiesForMobile type="movie-review" lng={lng} />
    </div>
  );
}
