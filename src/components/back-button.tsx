import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const { to } = props;

  return (
    <Link href={to} className="p-0">
      <ArrowLeftIcon size={16} className="ml-3 mr-2" />
    </Link>
  );
};

export type BackButtonProps = {
  to: `/${string}`;
};
