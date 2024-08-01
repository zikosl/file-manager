
import { HardDrive, LogOut, Trash2, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link, router, usePage } from "@inertiajs/react";
import { User } from "@/types";
import { __ } from "@/lib/lang";

export function UserNav() {
  const { props } = usePage<{
    auth: {
      user: User
    }
  }>()
  const user = props.auth.user ?? {}
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full w-8 h-8 bg-background"
                size="icon"
              >
                <UserIcon className="w-[1.2rem] h-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {__("Profile")}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 rtl:text-right">
            <p className="text-sm font-medium leading-none">
              {user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/client" className="flex items-center gap-3 rtl:flex-row-reverse">
              <HardDrive className="w-4 h-4  text-muted-foreground" />
              {__("My Drive")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="client/trash" className="flex items-center gap-3 rtl:flex-row-reverse">
              <Trash2 className="w-4 h-4 text-muted-foreground" />
              {__("Trash")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-3 hover:cursor-pointer rtl:flex-row-reverse" onClick={() => { router.delete(route("logout")) }}>
          <LogOut className="w-4 h-4 text-muted-foreground" />
          {__("Sign out")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
