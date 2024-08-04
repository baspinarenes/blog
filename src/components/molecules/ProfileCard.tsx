import Image from "next/image";
import { author } from "@/configs";
import screamLogo from "@/../public/scream.svg";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Spacer } from "../atoms";

export const ProfileCard = () => {
  return (
    <div className="flex items-center gap-2">
      <Image src={screamLogo} alt="Scream img" width={40} height={40} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {author.name} {author.surname}
        </span>
        <span className="text-xs font-extralight">{author.title}</span>
      </div>
      <Spacer />
      <LanguageSwitcher />
    </div>
  );
};
