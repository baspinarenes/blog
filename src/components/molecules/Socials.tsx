import { author } from "@/config";
import { type FC } from "react";
import { SocialLink } from "../atoms/SocialLink";

export const Socials: FC<SocialsProps> = () => {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(author.socials).map(([key, value]) => (
        <SocialLink
          key={key}
          type={key as keyof typeof author.socials}
          href={value}
        />
      ))}
    </div>
  );
};

export type SocialsProps = Readonly<{}>;
