import { useTranslation } from "@/app/i18n";
import { Language } from "@/lib/models";
import { FileTextIcon } from "lucide-react";

export const SelectContentInfo: React.FC<SelectContentInfoProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng, "common");

  return (
    <div className="absolute left-0 top-0 h-full w-full hidden lg:flex flex-col gap-2 justify-center items-center text-zinc-300">
      <FileTextIcon size={32} absoluteStrokeWidth />
      <span className="text-md">{t("choose-a-content")}</span>
    </div>
  );
};

export type SelectContentInfoProps = {
  lng: Language;
};
