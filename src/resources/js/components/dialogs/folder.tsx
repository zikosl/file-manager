import { useForm, usePage } from "@inertiajs/react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogPortal, DialogTitle } from "../ui/dialog"
import { DialogFooter, DialogHeader } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"


import { Dispatch, SetStateAction } from "react"
import { Space } from "@/data/schema"
import { __ } from "@/lib/lang"


export function AddFolderDialog({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { folder_id, space } = usePage<{
        folder_id: Number,
        space?: Space
    }>().props

    const { post, processing, errors, data, setData } = useForm({
        title: '',
        folder_id: folder_id
    })
    const submit = (e: any) => {
        e.preventDefault()
        if (space) {
            post(route("client.drive.store", space.id))
        }
        else {
            post(route("client.drive.store"))
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {__("Create Folder")}
                        </DialogTitle>
                        <DialogDescription>
                            {__("You can create folder by just click on the button below.")}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    {__("Name")}
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
                                <Button type="submit" disabled={processing}>{__("Create Folder")}</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
