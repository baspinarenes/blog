import { PostSelector } from "@/components/organisms";
import { isMobileDevice } from "@/libraries/device";
import { parsePathname } from "@/libraries/utils";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path")!;
  const { language, category } = parsePathname(pathname);
  const isMobile = await isMobileDevice();

  return (
    <div className="h-full sm:grid sm:grid-cols-[280px_1fr]">
      {!isMobile && <PostSelector language={language} category={category} />}
      {children}
    </div>
  );
}
