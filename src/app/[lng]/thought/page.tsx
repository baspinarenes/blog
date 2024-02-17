import { SelectContentInfo } from "@/components/select-content-info";
import { PageProps } from "@/lib/models";

export default function ThoughtsPage({ params: { lng } }: PageProps) {
  return (
    <div className="container mx-auto">
      <SelectContentInfo lng={lng} />
    </div>
  );
}
