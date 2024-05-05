import { useTranslation } from "@/app/i18n";
import { Language } from "@/lib/models";

export const NotFoundContent: React.FC<NotFoundContentProps> = async (props) => {
  const { lng } = props;
  const { t } = await useTranslation(lng, "common");

  return (
    <div className="absolute left-0 top-0 h-full w-full flex flex-col gap-2 justify-center items-center  text-zinc-300">
      <span className="font-mono text-6xl">{t("not-found.title")}</span>
      <span className="text-base">{t("not-found.description-2")}</span>
    </div>
  );
};

export type NotFoundContentProps = {
  lng: Language;
};
