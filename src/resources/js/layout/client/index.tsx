
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Sidebar } from "@/components/panel/sidebar";
import { Head, usePage } from "@inertiajs/react";
import { getMenuList } from "@/lib/menu-list";

export default function AdminPanelLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    const { url: pathname } = usePage()
    const menuList = getMenuList(pathname);

    if (!sidebar) return null;

    return (
        <>
            <Head title="Drive" />
            <Sidebar menuList={menuList} />
            <main
                className={cn(
                    "min-h-[calc(100vh)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 flex flex-1",
                    sidebar?.isOpen === false ? "ltr:lg:ml-[90px] rtl:lg:mr-[90px]" : "ltr:lg:ml-72 rtl:lg:mr-72"
                )}
            >
                {children}
            </main>
        </>
    );
}
