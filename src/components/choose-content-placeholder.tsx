export const ChooseContentPlaceholder: React.FC = async () => {
  const t = (...a: any) => "";
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center h-full text-zinc-300">
      <span className="font-mono text-6xl">{t("not-found.title")}</span>
      <span className="text-lg">{t("not-found.description")}</span>
    </div>
  );
};
