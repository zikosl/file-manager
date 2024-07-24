import { HardDriveIcon, MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePage } from "@inertiajs/react";
import { Group } from "@/lib/menu-list";

interface SheetMenuProps {
  menuList: Group[];
}

export function SheetMenu({ menuList }: SheetMenuProps) {
  const { url: pathname } = usePage()
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href={pathname.includes("client") ? "/client" : "/admin"} className="flex items-center gap-2">
              <HardDriveIcon className="w-6 h-6 mr-1" />
              <h1 className="font-bold text-lg">Uploady</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu menuList={menuList} isOpen />
      </SheetContent>
    </Sheet>
  );
}
