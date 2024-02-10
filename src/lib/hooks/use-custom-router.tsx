import { usePathname, useRouter } from "next/navigation";
import { Language } from "../models";

export const useCustomRouter = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (lang: Language) => {
    if (lang === "tr") {
      return router.push(pathname.replace(/$\/\w{2}/, ""));
    } else if (/^\/\w{2}\//.test(pathname)) {
      return router.push(pathname.replace(/^\/\w{2}/, `/${lang}`));
    }
    return router.push(`/${lang}${pathname}`);
  };
};
