import { NAVIGATIONS } from "@/lib/utils/constants";
import Link from "next/link";

export const HomeSection: React.FC<HomeSectionProps> = (props) => {
  const { type } = props;
  const navigation = NAVIGATIONS.find((nav) => nav.href === `/${type}`);

  return (
    <div className="flex flex-col mb-12 mt-12">
      <Link href={navigation!.href} className="w-fit inline-block">
        <h4 className="font-semibold w-fit text-xl underline-offset-4 hover:underline mb-4">
          {navigation?.label}
        </h4>
      </Link>
      <p>.....</p>
    </div>
  );
};

export type HomeSectionProps = {
  type: "book-review" | "thought" | "article";
};
