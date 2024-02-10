import { PageType } from "@/lib/models";
import { usePathname } from "next/navigation";

export const usePageType = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return PageType.HOME;
  } else if (pathname.endsWith("/writing")) {
    return PageType.WRITING;
  } else if (pathname.includes("/snippet")) {
    return PageType.SNIPPET;
  }

  return PageType.NOT_FOUND;
};

export type UsePAgeTYpeProps = {};
