import { ContentLayout } from "@/layout/client/content-layout";


import { usePage } from "@inertiajs/react";
import { DataTable, Files, Folder } from "@/components/folder/table";
import { useFolderConfig } from "@/hooks/use-folder-config";
import { useStore } from "zustand";
import { useEffect, useMemo } from "react";
import { Files_Folders } from "@/types";

export default function Trash() {
    const folderPath = useStore(useFolderConfig, (state) => state)
    const { folders, files } = usePage<{
        folders: Folder[],
        files: Files[]
    }>().props

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


    useEffect(() => {
        folderPath.setRouter("trash")
    }, [])

    return (
        <ContentLayout title="My Drive">
            <div className="flex flex-1 pt-8 pb-8 px-4 sm:px-8">
                <DataTable data={data} />
            </div>
        </ContentLayout>
    )
}
