import { ContentLayout } from "@/layout/admin/content-layout";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, usePage } from "@inertiajs/react";
import { MySpace, Space, User } from '@/types';
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

import * as React from "react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IconPlus } from "@tabler/icons-react";
import { __ } from "@/lib/lang";


export default function UpdateUser() {
    const { user, spaces, mySpaces } = usePage<{
        user: User,
        spaces: Space[],
        mySpaces: MySpace[]
    }>().props;

    const { data, setData, put, processing, errors } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        spaces: mySpaces
    })

    const [mySpace, setMySpaces] = useState<MySpace[]>([])
    const [allSpaces, setAllSpaces] = useState<Space[]>([])

    const [open, setOpen] = React.useState(false)


    useEffect(() => {
        setAllSpaces(spaces)
    }, [spaces])

    useEffect(() => {
        setMySpaces(mySpaces)
    }, [mySpaces])


    function submit(e: any) {
        e.preventDefault()
        console.log(data)
        put(route('admin.users.update', user.id))
    }

    useEffect(() => {
        setData("spaces", mySpace)
    }, [mySpace])

    const appandValue = (item: Space) => {
        setMySpaces([...mySpace, {
            ...item,
            read: false,
            write: false
        }])
        setAllSpaces(allSpaces.filter(v => v.id != item.id))
    }

    const removeValue = (item: Space) => {
        setAllSpaces([...allSpaces, item])
        setMySpaces(mySpace.filter(v => v.id != item.id))
    }
    return (
        <ContentLayout title={__("Edit User")}>

            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 justify-center'>
                <form onSubmit={submit}>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {__("Update User")}
                            </CardTitle>
                            <CardDescription>
                                {__("Enter user details and submit to update this user")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex gap-2">
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="first_name">{__("First Name")}</Label>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        value={data.first_name} onChange={e => setData('first_name', e.target.value)}
                                        required />
                                    {errors.first_name && <div className='text-red-500 text-sm'>{errors.first_name}</div>}
                                </div>
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="last_name">{__("Last Name")}</Label>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        placeholder="Last Name"
                                        value={data.last_name} onChange={e => setData('last_name', e.target.value)}
                                        required />
                                    {errors.last_name && <div className='text-red-500 text-sm'>{errors.last_name}</div>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">{__("Email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={data.email} onChange={e => setData('email', e.target.value)}
                                    required />
                                {errors.email && <div className='text-red-500 text-sm'>{errors.email}</div>}
                            </div>

                            {/* Process Spaces Related to user */}
                            <div className="flex items-center gap-4">
                                <Label>{__("Spaces")}</Label>
                                <SpaceList
                                    data={allSpaces}
                                    open={open}
                                    setOpen={setOpen}
                                    appendValue={appandValue}
                                >
                                    <Button
                                        type="button"
                                        className="w-5 h-5 p-1 rounded-sm"
                                        role="combobox"
                                        aria-expanded={open}
                                    // className="w-[200px] justify-between"
                                    >
                                        <IconPlus size={20} />
                                    </Button>
                                </SpaceList>
                            </div>
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                                {
                                    mySpace.map((v, i) => <Card key={i} className="w-64">
                                        <CardHeader>
                                            <div className="flex gap-2">
                                                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#" + v.color }}>
                                                </div>
                                                <CardTitle>{v.name}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    dir="ltr"
                                                    checked={v.read}
                                                    onCheckedChange={v => {
                                                        let items = [...mySpace]
                                                        items[i] = {
                                                            ...items[i],
                                                            read: v
                                                        }
                                                        setMySpaces(items)
                                                    }}
                                                    id={"read" + i}
                                                />
                                                <Label htmlFor={"read" + i}>{__("Read")}</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    dir="ltr"
                                                    id={"write" + i}
                                                    checked={v.write}
                                                    onCheckedChange={v => {
                                                        let items = [...mySpace]
                                                        items[i] = {
                                                            ...items[i],
                                                            write: v
                                                        }
                                                        setMySpaces(items)
                                                    }}
                                                />
                                                <Label htmlFor={"write" + i}>{__("Write")}</Label>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                size="sm"
                                                className="ltr:ml-auto rtl:mr-auto"
                                                type="button"
                                                onClick={() => removeValue(v)}
                                            >
                                                {__("Delete")}
                                            </Button>
                                        </CardFooter>
                                    </Card>)
                                }

                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={processing} className="ml-auto">{__("Submit")}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </ContentLayout >
    )
}


interface SpaceListItem {
    children: React.ReactNode
    data: Space[]
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    appendValue: (item: Space) => void
}
export function SpaceList(
    { data, open, setOpen, children, appendValue }: SpaceListItem
) {

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {
                    children
                }
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Space..." />
                    <CommandEmpty>No Space found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {data.map((item, i) => {
                                return (
                                    <CommandItem
                                        key={i}
                                        value={item.name}
                                        onSelect={() => {
                                            appendValue(item)
                                            setOpen(false)
                                        }}
                                    >
                                        {item.name}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}