import { useLocale } from "next-intl";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
