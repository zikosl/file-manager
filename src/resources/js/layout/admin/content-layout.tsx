import { getMenuList } from "@/lib/menu-list-admin";
import { usePage } from "@inertiajs/react";
import { UserNav } from "./user-nav";
import { Navbar } from "@/components/panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string | undefined
}

export function ContentLayout({ title, className, children }: ContentLayoutProps) {
  const { url: pathname } = usePage()
  const menuList = getMenuList(pathname);
  return (
    <div className={`flex-1 flex flex-col ${className}`}>
      <Navbar menuList={menuList} title={title}>
        <UserNav />
      </Navbar>
      <div className="container pt-8 pb-8 px-4 sm:px-8 flex-1">{children}</div>
    </div>
  );
}
