import { navigations } from "@/configs";
import { NavigationLink } from "../atoms";
import { capitalize } from "@/libraries/utils";
import { FC } from "react";

export const Navigations: FC<NavigationsProps> = ({ language, onClick }) => {
  return (
    <nav className="flex flex-col gap-1" onClickCapture={onClick}>
      {Object.entries(navigations[language]).map(([key, value]) => (
        <NavigationLink key={key} name={capitalize(key)} href={value} />
      ))}
    </nav>
  );
};

export type NavigationsProps = Readonly<{
  language: string;
  onClick?: () => void;
}>;
