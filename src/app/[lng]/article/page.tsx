import { EntitiesForMobile } from "@/components/entities-for-mobile";
import { SelectContentInfo } from "@/components/select-content-info";
import { PageProps } from "@/lib/models";

export default function ArticlePage({ params: { lng } }: PageProps) {
  return (
    <div>
      <SelectContentInfo lng={lng} />
      <EntitiesForMobile type="article" lng={lng} />
    </div>
  );
}
