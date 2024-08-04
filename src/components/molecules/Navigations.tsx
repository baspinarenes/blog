import { navigations } from "@/config";
import { NavigationLink } from "../atoms";
import { capitalize } from "@/lib/utils";
import { FC } from "react";

export const Navigations: FC<NavigationsProps> = ({ onClick }) => {
  return (
    <nav className="flex flex-col gap-1" onClickCapture={onClick}>
      {Object.entries(navigations.tr).map(([key, value]) => (
        <NavigationLink key={key} name={capitalize(key)} href={value} />
      ))}
    </nav>
  );
};

export type NavigationsProps = Readonly<{
  onClick?: () => void;
}>;
