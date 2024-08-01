import { IconPlanet, IconSpace } from "@tabler/icons-react";
import {
  LucideIcon,
  HardDrive,
  Star,
  Trash,
  Plus
} from "lucide-react";
import { __ } from "./lang";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon | typeof IconSpace;
  submenus: Submenu[];
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "Add",
          label: __("New"),
          active: false,
          icon: Plus,
          submenus: [],
        }
      ]
    },
    {
      groupLabel: __("Main"),
      menus: [
        {
          href: "/client",
          label: __("My Drive"),
          active: pathname == "/client",
          icon: HardDrive,
          submenus: []
        },
        {
          href: "/client/starred",
          label: __("Starred"),
          active: pathname == "/client/starred",
          icon: Star,
          submenus: []
        },
        {
          href: "/client/spaces",
          label: __("My Spaces"),
          active: pathname.includes("/client/spaces"),
          icon: IconPlanet,
          submenus: []
        }
      ]
    },
    {
      groupLabel: __("Others"),
      menus: [
        {
          href: "/client/trash",
          label: __("Trash"),
          active: pathname == "/client/trash",
          icon: Trash,
          submenus: []
        }
      ]
    }
  ];
}
