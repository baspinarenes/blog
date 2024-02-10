"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCustomRouter } from "@/lib/hooks/use-custom-router";

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const redirectForLocale = useCustomRouter();

  return (
    <Select defaultValue="en" onValueChange={redirectForLocale}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">Turkish</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
};

export type LanguageSelectorProps = {};
