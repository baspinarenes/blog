import { FileTextIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const SelectContentInfo: React.FC<SelectContentInfoProps> = () => {
  const t = useTranslations("Common");

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full text-zinc-300">
      <FileTextIcon size={32} absoluteStrokeWidth />
      <span className="text-lg">{t("choose-a-content")}</span>
    </div>
  );
};

export type SelectContentInfoProps = {};
