import {
  LucideIcon,
  HardDrive,
  Star,
  Share2Icon,
  Trash,
  Plus
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
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
          label: "New",
          active: false,
          icon: Plus,
          submenus: [],
        }
      ]
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "/client",
          label: "My Drive",
          active: pathname == "/client",
          icon: HardDrive,
          submenus: []
        },
        {
          href: "/client/started",
          label: "Started",
          active: pathname == "/client/started",
          icon: Star,
          submenus: []
        },
        {
          href: "/client/shared",
          label: "Shared Drive",
          active: pathname == "/client/shared",
          icon: Share2Icon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Others",
      menus: [
        {
          href: "/client/trash",
          label: "Trash",
          active: pathname == "/client/trash",
          icon: Trash,
          submenus: []
        }
      ]
    }
  ];
}
