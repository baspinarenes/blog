import { SelectContentInfo } from "@/components/select-content-info";
import { PageProps } from "@/lib/models";

export default function ThoughtsPage({ params: { lng } }: PageProps) {
  return <SelectContentInfo lng={lng} />;
}
