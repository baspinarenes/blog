import { author } from "@/configs";
import { type FC } from "react";
import { Icon } from "../atoms";
import { capitalize } from "@/libraries/utils";

export const SocialLink: FC<SocialLinkProps> = ({ type, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "flex gap-4 items-center px-2 py-2 rounded-lg text-sm hover:bg-gray-200"
      }
    >
      <Icon name={type} size={18} />
      {capitalize(type)}
      <Icon name="external" size={18} className="ml-auto" />
    </a>
  );
};

export type SocialLinkProps = Readonly<{
  type: keyof typeof author.socials;
  href: string;
}>;
