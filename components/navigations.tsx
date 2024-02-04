import { NAVIGATIONS } from "@/lib/constants";
import { Navlink } from "./navlink";

export const Navigations: React.FC<NavigationsProps> = (props) => {
  const {} = props;

  return (
    <div className="flex flex-col gap-1">
      {NAVIGATIONS.map((nav) => {
        const iconComponent = <nav.icon size={16} />;
        return <Navlink key={nav.href} href={nav.href} label={nav.label} icon={iconComponent} />;
      })}
    </div>
  );
};

export type NavigationsProps = {};
