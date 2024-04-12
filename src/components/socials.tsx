import { AUTHOR } from "@/lib/constants";
import { Navlink } from "./navlink";

export const Socials: React.FC<SocialsProps> = (props) => {
  const {} = props;

  return (
    <div className="flex flex-col gap-2 lg:gap-1">
      {AUTHOR.socials.map((s) => {
        const iconComponent = <s.icon size={16} />;
        return (
          <Navlink key={s.name} href={s.url} icon={iconComponent} external rounded>
            {s.name}
          </Navlink>
        );
      })}
    </div>
  );
};

export type SocialsProps = {};
