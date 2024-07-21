
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Folder, Star, Trash2 } from "lucide-react"

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
import { IconArrowBack, IconFolder, IconFolderBolt, IconFolderMinus, IconFolderStar, IconStarFilled } from "@tabler/icons-react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { useFolderConfig } from "@/hooks/use-folder-config"
import { useStore } from "zustand"
import { Files_Folders } from "@/types"
import { FileIconCustom } from "@/lib/extensions"



export type Folder = {
    id: number
    itemId: number
    title: string
    started: boolean
    created: string
}

export type Files = {
    id: number
    itemId: number
    name: string
    started: boolean
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
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {

            //Get the file extension
            const fileExtension = row.original.name.split(".")[row.original.name.split(".").length - 1];

            return row.original.isFile ?
                <div className="lowercase text-gray-700 dark:text-white flex gap-3 items-center">
                    {
                        <div className="lowercase w-4 h-4 flex gap-3 items-center">
                            <FileIconCustom extension={fileExtension} />
                        </div>
                    }
                    <span className="text-md">{row.getValue("name")}</span>
                    {(!noStar && row.original.started) ? <IconStarFilled className="text-yellow-500" size={16} /> : ""}
                </div> : <Link href={route("client.drive.list", row.original.id)}>
                    <div className="lowercase text-gray-700 dark:text-white flex gap-3 items-center">
                        {!noStar && row.original.started ? <IconFolderStar className="text-yellow-500" size={16} /> : <IconFolder size={16} />}
                        <span className="text-md">{row.getValue("name")}</span>
                    </div>
                </Link>
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
                    Created date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
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
                <></>
            )
        },
        cell: ({ row }) => {
            return <div className="lowercase text-gray-700 dark:text-white flex gap-3 items-center">
                {
                    row.original.isFile && <span className="text-md">{Math.round(parseInt(row.getValue("size")) / 1024)} Kb</span>
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
export function DataTable({ data }: { data: Files_Folders[] }) {

    const { parent, folder_id } = usePage<{
        folder_id: Number | null,
        parent: Number | null
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
        getPaginationRowModel: getPaginationRowModel(),
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
                    placeholder="Filter Names..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

            </div>
            <div className="rounded-md border-0">
                <Table >
                    <TableHeader className="border-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-0" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                        >
                            {
                                folder_id != null && <TableCell
                                    colSpan={2}
                                >
                                    <Link href={parent == null ? route("client.drive") : route("client.drive.list", parent)}>
                                        <div className="lowercase text-gray-500 dark:text-white flex gap-3 items-center">
                                            <IconArrowBack size={15} />
                                            <span className="text-md text-gray-500 dark:text-white">{"Go back"}</span>
                                        </div>
                                    </Link>
                                </TableCell>
                            }

                        </TableRow>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <ContextMenu key={row.id}>
                                    <ContextMenuTrigger
                                        className={`${TableRow.propTypes?.className} select-none table-row border-0 hover:bg-slate-300/10 cursor-pointer`}
                                        key={row.id}
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
                                                >
                                                    <div className="flex flex-row items-center gap-1 text-sm">
                                                        <IconFolderBolt size={15} />
                                                        <p>Restore Now</p>
                                                    </div>
                                                </ContextMenuItem>
                                                <ContextMenuItem
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex flex-row text-destructive items-center gap-1 text-sm">
                                                        <IconFolderMinus size={15} />
                                                        <p>Delete Forever</p>
                                                    </div>
                                                </ContextMenuItem>
                                            </> : <>

                                                {/* This action allowed for folders only  */}

                                                <ContextMenuItem
                                                    className="cursor-pointer"
                                                    onClick={() => router.put(route("client.drive.star", row.original.itemId))}
                                                >
                                                    <div className="flex flex-row items-center gap-1 text-sm">
                                                        <Star size={15} />
                                                        {
                                                            folderPath.router == "star" ? <p>Unstarted Folder</p> : <p>{row.original.started ? "Uns" : "S"}tarted Folder</p>
                                                        }
                                                    </div>
                                                </ContextMenuItem>
                                                <ContextMenuItem className="cursor-pointer"
                                                    onClick={() => router.delete(route("client.drive.delete", row.original.itemId))}
                                                >
                                                    <div className="flex flex-row items-center gap-1 text-sm">
                                                        <Trash2 size={15} />
                                                        <p>Delete Folder</p>
                                                    </div>
                                                </ContextMenuItem>
                                            </>
                                        }

                                    </ContextMenuContent>
                                </ContextMenu>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns(folderPath.router != "client").length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
