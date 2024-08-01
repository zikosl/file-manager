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
import { useForm } from "@inertiajs/react";
import { ColorPicker } from "@/components/ui/color-picker";
import { useMemo } from "react";
import { __ } from "@/lib/lang";


export default function CreateSpace() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        color: '2f85da',
    })


    function submit(e: any) {
        e.preventDefault()


        post(route('admin.spaces.store'))
    }
    const color = useMemo(() => {
        return "#" + data.color
    }, [data.color])
    return (
        <ContentLayout title={__("Create Space")}>

            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 justify-center'>
                <form onSubmit={submit}>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl">{__("Create Space")}</CardTitle>
                            <CardDescription>
                                {__("Enter space details and submit to create a new space")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex lg:flex-row flex-col gap-2">
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="name">
                                        {__("Space Name")}
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Space Name"
                                        value={data.name} onChange={e => setData('name', e.target.value)}
                                        required />
                                    {errors.name && <div className='text-red-500 text-sm'>{errors.name}</div>}
                                </div>
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="color">
                                        {__("Space Color")}
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="color"
                                            type="text"
                                            placeholder="Space Color"
                                            disabled
                                            style={{ borderColor: color, borderWidth: 4 }}
                                            value={color}
                                            required />
                                        <ColorPicker
                                            value={color} onChange={value => setData('color', value.slice(1))}
                                        />
                                    </div>
                                    {errors.color && <div className='text-red-500 text-sm'>{errors.color}</div>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={processing} className="ml-auto">
                                {__("Submit")}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </ContentLayout>
    )
}

