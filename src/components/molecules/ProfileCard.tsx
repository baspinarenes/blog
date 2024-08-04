import Image from "next/image";
import { author } from "@/config";
import screamLogo from "@public/scream.svg";

export const ProfileCard = () => {
  return (
    <div className="flex gap-2">
      <Image src={screamLogo} alt="Scream img" width={40} height={40} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{author.name}</span>
        <span className="text-xs font-extralight">{author.title}</span>
      </div>
    </div>
  );
};
