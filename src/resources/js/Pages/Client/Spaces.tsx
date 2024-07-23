import { ContentLayout } from "@/layout/client/content-layout";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { FilePlus, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, usePage } from "@inertiajs/react";
import { DataTable, Files, Folder } from "@/components/folder/table";
import { useStore } from "zustand";
import { useFolderConfig } from "@/hooks/use-folder-config";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FileUploader } from "@/components/folder/file";
import { useUploadFile } from "@/hooks/use-upload-file";
import { Files_Folders, Space } from "@/types";
import { SpacesTools } from "@/components/spaces-tools";

export default function Home() {
    const folderPath = useStore(useFolderConfig, (state) => state)
    const { folders, files } = usePage<{
        folders: Folder[],
        files: Files[]
    }>().props
    console.log(files, folders)
    const [isOpen, setIsOpen] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    useEffect(() => {
        folderPath.setRouter("spaces")
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


    return (
        <ContentLayout title="My Spaces" >
            <ContextMenu>
                <ContextMenuTrigger className="flex-1 flex">
                    <div className="flex flex-1 pt-8 pb-8 px-4 sm:px-8">
                        <DataTable data={data}>
                            <SpacesTools />
                        </DataTable>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={() => { setIsUploadOpen(true) }} className="cursor-pointer">
                        <div className="flex flex-row items-center gap-1 text-sm">
                            <FilePlus size={15} />
                            <p>Upload File</p>
                        </div>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => { setIsOpen(true) }} className="cursor-pointer">
                        <div className="flex flex-row items-center gap-1 text-sm">
                            <FolderPlus size={15} />
                            <p>New Folder</p>
                        </div>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <DialogUploader open={isUploadOpen} setOpen={setIsUploadOpen} />
            <AddFolderDialog open={isOpen} setOpen={setIsOpen} />
        </ContentLayout>
    )
}


export function DialogUploader({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {

    const { folder_id, space } = usePage<{
        folder_id: number,
        space: Space
    }>().props

    const [_, setFiles] = useState<File[]>([])
    const { uploadFiles, progresses, isUploading } = useUploadFile(
        route("client.drive.file.store", space.id),
        folder_id
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Upload files</DialogTitle>
                    <DialogDescription>
                        Drag and drop your files here or click to browse.
                    </DialogDescription>
                </DialogHeader>
                <FileUploader
                    maxFiles={8}
                    maxSize={8 * 1024 * 1024}
                    onValueChange={setFiles}
                    progresses={progresses}
                    onUpload={uploadFiles}
                    disabled={isUploading}
                />
            </DialogContent>
        </Dialog>
    )
}


export function AddFolderDialog({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { folder_id, space } = usePage<{
        folder_id: Number,
        space: Space
    }>().props

    const { post, processing, errors, data, setData } = useForm({
        title: '',
        folder_id: folder_id
    })
    const submit = (e: any) => {
        e.preventDefault()
        post(route("client.drive.store", space.id))
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Folder</DialogTitle>
                        <DialogDescription>
                            You can create folder by just click on the button below
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={data.title} onChange={e => setData('title', e.target.value)}
                                    className="col-span-3"
                                />
                                {errors.title && <div className='text-red-500 text-sm'>{errors.title}</div>}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" disabled={processing}>Create Folder</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
