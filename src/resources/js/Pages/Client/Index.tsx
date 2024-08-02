import { ContentLayout } from "@/layout/client/content-layout";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { FilePlus, FolderPlus } from "lucide-react";


import { usePage } from "@inertiajs/react";
import { DataTable, Files, Folder } from "@/components/folder/table";
import { useStore } from "zustand";
import { useFolderConfig } from "@/hooks/use-folder-config";
import { useEffect, useMemo, useState } from "react";
import { Files_Folders } from "@/types";
import { DialogUploader } from "@/components/dialogs/file";
import { AddFolderDialog } from "@/components/dialogs/folder";
import { __ } from "@/lib/lang";
import { toast } from "sonner";

export default function Home() {
    const folderPath = useStore(useFolderConfig, (state) => state)
    const { folders, files, flash } = usePage<{
        folders: Folder[],
        files: Files[],
        flash: {
            error?: string,
            success?: string
        }
    }>().props
    const [isOpen, setIsOpen] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    useEffect(() => {
        folderPath.setRouter("client")
    }, [])
    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash])
    const data: Files_Folders[] = useMemo(() => {
        let folders_new = folders.map(v => ({
            id: v.id,
            itemId: v.itemId,
            name: v.title,
            starred: v.starred,
            isFile: false,
            size: 0,
            created: v.created
        }))

        let files_new = files.map(v => ({
            id: v.id,
            itemId: v.itemId,
            name: v.name,
            starred: v.starred,
            isFile: true,
            size: v.size,
            created: v.created
        }))
        return [...folders_new, ...files_new]
    }, [folders, files])


    return (
        <ContentLayout title={__("My Drive")} >
            <ContextMenu>
                <ContextMenuTrigger className="flex-1 flex">
                    <div className="flex flex-1 pt-8 pb-8 px-4 sm:px-8">
                        <DataTable data={data} />
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={() => { setIsUploadOpen(true) }} className="cursor-pointer">
                        <div className="flex flex-row items-center gap-1 text-sm rtl:flex-row-reverse rtl:ml-auto">
                            <FilePlus size={15} />
                            <p>{__("Upload File")}</p>
                        </div>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => { setIsOpen(true) }} className="cursor-pointer">
                        <div className="flex flex-row items-center gap-1 text-sm rtl:flex-row-reverse rtl:ml-auto">
                            <FolderPlus size={15} />
                            <p>{__("New Folder")}</p>
                        </div>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <DialogUploader open={isUploadOpen} setOpen={setIsUploadOpen} />
            <AddFolderDialog open={isOpen} setOpen={setIsOpen} />
        </ContentLayout>
    )
}



