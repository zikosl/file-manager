import {
  LucideIcon,
  LayoutDashboard,
  Users,
  Space,
  Orbit
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

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Main",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname == "/admin",
          icon: LayoutDashboard,
          submenus: []
        },
        {
          href: "",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: Users,
          submenus: [
            {
              href: "/admin/users",
              label: "All Users",
              active: pathname === "/admin/users"
            },
            {
              href: "/admin/users/create",
              label: "New User",
              active: pathname === "/admin/users/create"
            }
          ]
        },
        {
          href: "",
          label: "Spaces",
          active: pathname.includes("/admin/spaces"),
          icon: Orbit,
          submenus: [
            {
              href: "/admin/spaces",
              label: "All spaces",
              active: pathname === "/admin/spaces"
            },
            {
              href: "/admin/spaces/create",
              label: "New Space",
              active: pathname === "/admin/spaces/create"
            }
          ]
        }
      ]
    }
  ];
}
