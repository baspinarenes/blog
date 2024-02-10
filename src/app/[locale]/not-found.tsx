import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("not-found");

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center h-full text-zinc-300">
      <span className="font-mono text-9xl">404</span>
      <span className="text-lg">{t("description")}</span>
    </div>
  );
}
