import { AUTHOR } from "@/lib/constants";
import { Navlink } from "./navlink";

export const Socials: React.FC<SocialsProps> = (props) => {
  const {} = props;

  return (
    <div className="flex flex-col gap-1">
      {AUTHOR.socials.map((s) => {
        const iconComponent = <s.icon size={16} />;
        return <Navlink key={s.name} href={s.url} label={s.name} icon={iconComponent} external />;
      })}
    </div>
  );
};

export type SocialsProps = {};
