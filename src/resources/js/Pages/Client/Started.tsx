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
import { useEffect, useMemo, useState } from "react";
import { useFolderConfig } from "@/hooks/use-folder-config";
import { Files_Folders } from "@/types";
import { AddFolderDialog } from "@/components/dialogs/folder";
import { DialogUploader } from "@/components/dialogs/file";

export default function Started() {
    const folderPath = useStore(useFolderConfig, (state) => state)
    const { folders, files } = usePage<{
        folders: Folder[],
        files: Files[]
    }>().props
    useEffect(() => {
        folderPath.setRouter("star")
    }, [])


    const data: Files_Folders[] = useMemo(() => {
        let folders_new = folders.map(v => ({
            id: v.id,
            itemId: v.itemId,
            name: v.title,
            started: v.started,
            isFile: false,
            size: 0,
            created: v.created
        }))

        let files_new = files.map(v => ({
            id: v.id,
            itemId: v.itemId,
            name: v.name,
            started: v.started,
            isFile: true,
            size: v.size,
            created: v.created
        }))
        return [...folders_new, ...files_new]
    }, [folders, files])

    const [open, setOpen] = useState(false)
    const [upload, setUpload] = useState(false)
    return (
        <ContentLayout title="My Drive">
            <ContextMenu>
                <ContextMenuTrigger className="flex-1 flex">
                    <div className="flex flex-1 pt-8 pb-8 px-4 sm:px-8">
                        <DataTable data={data} />
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem
                        onClick={() => setUpload(true)}
                        className="cursor-pointer">
                        <div className="flex flex-row items-center gap-1 text-sm">
                            <FilePlus size={15} />
                            <p>Upload File</p>
                        </div>
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={() => setOpen(true)}
                        className="cursor-pointer">
                        <div className="flex flex-row items-center gap-1 text-sm">
                            <FolderPlus size={15} />
                            <p>New Folder</p>
                        </div>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <AddFolderDialog open={open} setOpen={setOpen} />
            <DialogUploader open={upload} setOpen={setUpload} />
        </ContentLayout>
    )
}

