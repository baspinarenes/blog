import { Navigations } from "./navigations";
import { Profile } from "./profile";
import { Socials } from "./socials";

export const MenuContent: React.FC<MenuContentProps> = (props) => {
  const {} = props;

  return (
    <div className="w-full p-3 flex flex-col gap-6">
      <Profile />
      <Navigations />
      <hr className="m-0 mt-auto" />
      <Socials />
    </div>
  );
};

export type MenuContentProps = {};
