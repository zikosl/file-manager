import { Navbar } from "@/components/panel/navbar";
import { getMenuList } from "@/lib/menu-list";
import { usePage } from "@inertiajs/react";
import { UserNav } from "./user-nav";






interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}


export function ContentLayout({ title, children }: ContentLayoutProps) {
  const { url: pathname } = usePage()
  const menuList = getMenuList(pathname);
  return (
    <div className="flex flex-1 flex-col">
      <Navbar menuList={menuList} title={title} >
        <UserNav />
      </Navbar>
      <div className="container px-0  flex flex-1 flex-col">{children}</div>
    </div>
  );
}


