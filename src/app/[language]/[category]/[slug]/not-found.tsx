import { Icon } from "@/components/atoms";
import { useTranslation } from "@/i18n";

export default async function NotFound() {
  const { t } = await useTranslation("en", "common");

  return (
    <div className="flex flex-col items-center content-center justify-center h-full text-gray-400 -mt-6">
      <Icon name="not-found" size={72} color="#999" className="mb-4" />
      <span className="mx-2 text-center">
        {t("not-found", { type: "post" })}
      </span>
    </div>
  );
}
