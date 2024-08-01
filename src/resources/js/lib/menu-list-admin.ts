import {
  LucideIcon,
  LayoutDashboard,
  Users,
  Orbit
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
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: __("Main"),
      menus: [
        {
          href: "/admin",
          label: __("Dashboard"),
          active: pathname == "/admin",
          icon: LayoutDashboard,
          submenus: []
        },
        {
          href: "",
          label: __("Users"),
          active: pathname.includes("/admin/users"),
          icon: Users,
          submenus: [
            {
              href: "/admin/users",
              label: __("All Users"),
              active: pathname === "/admin/users"
            },
            {
              href: "/admin/users/create",
              label: __("New User"),
              active: pathname === "/admin/users/create"
            }
          ]
        },
        {
          href: "",
          label: __("Spaces"),
          active: pathname.includes("/admin/spaces"),
          icon: Orbit,
          submenus: [
            {
              href: "/admin/spaces",
              label: __("All spaces"),
              active: pathname === "/admin/spaces"
            },
            {
              href: "/admin/spaces/create",
              label: __("New Space"),
              active: pathname === "/admin/spaces/create"
            }
          ]
        }
      ]
    }
  ];
}
