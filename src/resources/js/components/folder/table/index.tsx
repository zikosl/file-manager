
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    // getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, Dot, Folder, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import dayjs from "dayjs"

import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link, router, usePage } from "@inertiajs/react"
import { IconArrowBack, IconDownload, IconFolder, IconFolderBolt, IconFolderMinus, IconFolderStar, IconLink, IconStarFilled } from "@tabler/icons-react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"
import { useFolderConfig } from "@/hooks/use-folder-config"
import { useStore } from "zustand"
import { Files_Folders } from "@/types"
import { FileIconCustom } from "@/lib/extensions"
import axios from "axios"
import { toast } from "sonner"
import { Space } from "@/data/schema"
import { formatBytes } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { __ } from "@/lib/lang"



export type Folder = {
    id: number
    itemId: number
    title: string
    starred: boolean
    created: string
}

export type Files = {
    id: number
    itemId: number
    name: string
    starred: boolean
    size: number
    created: string
}

export const columns: (noStar: boolean) => ColumnDef<Files_Folders>[] = (noStar = false) => [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {__("Name")}
                    {
                        !column.getIsSorted() ? <ArrowUpDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
                    }
                </Button>
            )
        },
        cell: ({ row }) => {

            //Get the file extension
            const name_list = row.original.name.split(".")
            let fileExtension = "";
            if (row.original.isFile) {
                fileExtension = name_list.pop() ?? "";
            }
            let name = name_list.join(".");
            name = name.length > 24 ? name.slice(0, 24) + "..." : name;

            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {
                                row.original.isFile ?
                                    <div className="lowercase text-gray-700 dark:text-white flex gap-3 items-center">
                                        {
                                            <div className="lowercase w-4 h-4 flex gap-3 items-center">
                                                <FileIconCustom extension={fileExtension} />
                                            </div>
                                        }
                                        <span className="text-md">{name}.{fileExtension}</span>
                                        {(!noStar && row.original.starred) ? <IconStarFilled className="text-yellow-500" size={16} /> : ""}
                                    </div> :
                                    <div className="lowercase text-gray-700 dark:text-white flex gap-3 items-center">
                                        {!noStar && row.original.starred ? <IconFolderStar className="text-yellow-500" size={16} /> : <IconFolder size={16} />}
                                        <span className="text-md">{name}</span>
                                    </div>
                            }
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{row.original.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>)
        }
    },
    {
        accessorKey: "created",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {__("Created date")}
                    {
                        !column.getIsSorted() ? <ArrowUpDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
                    }
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="lowercase text-gray-700 dark:text-white flex gap-3 items-center">
                <span className="text-md">{dayjs(row.getValue("created")).format("DD MMM. YYYY HH:mm:ss")}</span>
            </div>
        }
    },
    {
        accessorKey: "size",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {__("Size")}
                    {
                        !column.getIsSorted() ? <ArrowUpDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
                    }
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="lowercase text-gray-700 dark:text-white flex gap-3 items-center">
                {
                    row.original.isFile && <span className="text-md">{formatBytes(Number(row.getValue("size")))}</span>
                }
            </div>
        }
    }
]

/*
{
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
*/
export function DataTable({ data, children }: { data: Files_Folders[], children?: React.ReactNode }) {

    const { parent, folder_id, space, spaces, locale } = usePage<{
        folder_id: Number | null,
        parent: Number | null,
        space: Space,
        spaces: Space[],
        locale: string,
    }>().props
    const folderPath = useStore(useFolderConfig, (state) => state)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns: columns(folderPath.router != "client"),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder={__("Filter Names...")}
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm "
                />
                {
                    children
                }
            </div>
            <div className="rounded-md border-0">
                <Table >
                    <TableHeader className="border-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-0" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="rtl:text-right">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="border-0">
                        <TableRow
                            className="border-0 cursor-pointer"
                            onClick={() => {
                                if (folderPath.router == "spaces") {
                                    if (parent) {
                                        router.get(route("client.spaces.list", [space.id, parent]))
                                    }
                                    else {
                                        router.get(route("client.spaces", space.id))
                                    }
                                }
                                else {
                                    if (parent) {
                                        router.get(route("client.drive.list", parent))
                                    }
                                    else {
                                        router.get(route("client.drive"))
                                    }
                                }
                            }}
                        >
                            {
                                folder_id != null && <TableCell
                                    colSpan={2}
                                >
                                    <div className="lowercase text-gray-500 dark:text-white flex gap-3 items-center">
                                        <IconArrowBack size={15} />
                                        <span className="text-md text-gray-500 dark:text-white">{"Go back"}</span>
                                    </div>
                                </TableCell>
                            }

                        </TableRow>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => folderPath.router != "spaces" ? (
                                <ContextMenu key={row.id} dir={locale == "ar" ? "rtl" : "ltr"}>
                                    <ContextMenuTrigger
                                        className={`${TableRow.propTypes?.className} select-none table-row border-0 hover:bg-slate-300/10 cursor-pointer`}
                                        key={row.id}
                                        onClick={() => {
                                            if (!row.original.isFile) {
                                                router.get(route("client.drive.list", row.original.id))
                                            }
                                        }}
                                        data-state={row.getIsSelected() && "selected"}
                                    >

                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        {
                                            folderPath.router == "trash" ? <>
                                                <ContextMenuItem
                                                    className="cursor-pointer"
                                                    onClick={() => router.delete(route("client.drive.delete", row.original.itemId))}
                                                >
                                                    <div className="flex rtl:flex-row rtl:ml-auto items-center gap-1 text-sm">
                                                        <IconFolderBolt size={15} />
                                                        <p>{__("Restore Now")}</p>
                                                    </div>
                                                </ContextMenuItem>
                                                <ContextMenuItem
                                                    className="cursor-not-allowed"
                                                >
                                                    <div className="flex rtl:flex-row rtl:ml-auto text-destructive items-center gap-1 text-sm">
                                                        <IconFolderMinus size={15} />
                                                        <p>
                                                            {__("Delete Forever")}
                                                        </p>
                                                    </div>
                                                </ContextMenuItem>
                                            </> : <>

                                                {/* This action allowed for folders only  */}

                                                <ContextMenuItem
                                                    className="cursor-pointer"
                                                    onClick={() => router.put(route("client.drive.star", row.original.itemId))}
                                                >
                                                    <div className="flex rtl:flex-row rtl:ml-auto items-center gap-1 text-sm">
                                                        <Star size={15} />
                                                        {
                                                            <p>{row.original.starred || folderPath.router == "star" ? __("Unstar") : __("Star")} {row.original.isFile ? __("File") : __("Folder")}</p>
                                                        }
                                                    </div>
                                                </ContextMenuItem>
                                                {
                                                    folderPath.router == "client" && !row.original.isFile && spaces?.length > 0 && (
                                                        <ContextMenuSub>
                                                            <ContextMenuSubTrigger inset>{__("Share To")}</ContextMenuSubTrigger>
                                                            <ContextMenuSubContent className="w-48">
                                                                {
                                                                    spaces?.map((v) => <ContextMenuItem className="rtl:flex-row-reverse cursor-pointer">
                                                                        <Link
                                                                            href={route("folder.add.space", row.original.itemId)}
                                                                            data={{ id: v.id }}
                                                                            method="post"
                                                                            type="button"
                                                                            className="flex flex-1"
                                                                        >
                                                                            <span className="rtl:flex-1">
                                                                                {v.name}
                                                                            </span>
                                                                            <ContextMenuShortcut>
                                                                                <Dot color={"#" + v.color} />
                                                                            </ContextMenuShortcut>
                                                                        </Link>
                                                                    </ContextMenuItem>)
                                                                }
                                                            </ContextMenuSubContent>
                                                        </ContextMenuSub>
                                                    )
                                                }
                                                {
                                                    row.original.isFile && <ContextMenuItem className="cursor-pointer"
                                                        onClick={() => {
                                                            axios.post(route("link.generate", row.original.id))
                                                                .then(e => {
                                                                    toast(e.data, {
                                                                        action: {
                                                                            label: 'Copy',
                                                                            onClick: () => {
                                                                                navigator.clipboard.writeText(e.data).then((_) => {
                                                                                    toast.success("copied to clipboard")
                                                                                })
                                                                            }
                                                                        },
                                                                    })
                                                                })
                                                        }}
                                                    >
                                                        <div className="flex rtl:flex-row rtl:ml-auto items-center gap-1 text-sm">
                                                            <IconLink size={15} />
                                                            <p>{__("Generate Link")}</p>
                                                        </div>
                                                    </ContextMenuItem>
                                                }
                                                {
                                                    row.original.isFile && <ContextMenuItem className="cursor-pointer"
                                                    >
                                                        <a
                                                            href={route("link.download", row.original.id)}
                                                            className="flex-1"
                                                        >
                                                            <div className="flex rtl:flex-row rtl:ml-auto items-center gap-1 text-sm">
                                                                <IconDownload size={15} />
                                                                <p>{__("File Download")}</p>
                                                            </div>
                                                        </a>

                                                    </ContextMenuItem>
                                                }
                                                <ContextMenuItem className="cursor-pointer"
                                                    onClick={() => router.delete(route("client.drive.delete", row.original.itemId))}
                                                >
                                                    <div className="flex rtl:flex-row rtl:ml-auto items-center gap-1 text-sm">
                                                        <Trash2 size={15} />
                                                        <p>{__("Delete")} {row.original.isFile ? __("File") : __("Folder")}</p>
                                                    </div>
                                                </ContextMenuItem>
                                            </>
                                        }

                                    </ContextMenuContent>
                                </ContextMenu>
                            ) : <TableRow
                                className={`select-none table-row border-0 hover:bg-slate-300/10 cursor-pointer`}
                                key={row.id}
                                onContextMenu={(e) => e.preventDefault()}
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => {
                                    router.get(route("client.spaces.list", [space.id, row.original.id]))
                                }}
                            >
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>)
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns(folderPath.router != "client").length}
                                    className="h-24 text-center"
                                >

                                    {__("No results.")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
