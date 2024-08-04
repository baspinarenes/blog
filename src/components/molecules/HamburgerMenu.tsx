"use client";

import { useState, type FC } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { IconMenu2 } from "@tabler/icons-react";
import { MenuDrawer } from "./MenuDrawer";

export const HamburgerMenu: FC<HamburgerMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="mr-3">
        <IconMenu2 size={24} stroke={1.6} />
      </DrawerTrigger>
      <DrawerContent className="w-screen">
        <DrawerHeader></DrawerHeader>
        <MenuDrawer onClose={close} />
      </DrawerContent>
    </Drawer>
  );
};

export type HamburgerMenuProps = Readonly<{}>;
