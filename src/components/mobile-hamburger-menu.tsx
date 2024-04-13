import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { MenuContent } from "./menu-content";
import { Language } from "@/lib/models";

export const MobileHamburgerMenu: React.FC<MobileHamburgerMenuProps> = (props) => {
  const { lng } = props;

  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="px-1 py-2" size="icon" variant="ghost">
          <MenuIcon size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <MenuContent lng={lng} />
      </DrawerContent>
    </Drawer>
  );
};

export type MobileHamburgerMenuProps = {
  lng: Language;
};
