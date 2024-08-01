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
import { PasswordInput } from "@/components/custom/password-input";
import { useForm } from "@inertiajs/react";
import { __ } from "@/lib/lang";


export default function CreateUser() {

    const { data, setData, post, processing, errors } = useForm({
        first_name: 'amir',
        last_name: 'slimi',
        email: 'amir@gmail.com',
        password: '12345678',
    })

    function submit(e: any) {
        e.preventDefault()
        post(route('admin.users.store'))
    }
    return (
        <ContentLayout title={__("Create User")}>

            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 justify-center'>
                <form onSubmit={submit}>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl">{__("Create User")}</CardTitle>
                            <CardDescription>
                                {__("Enter user details and submit to create a new user")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex gap-2">
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="first_name">
                                        {__("First Name")}
                                    </Label>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        value={data.first_name} onChange={e => setData('first_name', e.target.value)}
                                        required />
                                    {errors.first_name && <div>{errors.first_name}</div>}
                                </div>
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="last_name">
                                        {__("Last Name")}
                                    </Label>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        placeholder="Last Name"
                                        value={data.last_name} onChange={e => setData('last_name', e.target.value)}
                                        required />
                                    {errors.last_name && <div>{errors.last_name}</div>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {__("Email")}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={data.email} onChange={e => setData('email', e.target.value)}
                                    required />
                                {errors.email && <div>{errors.email}</div>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    {__("Password")}
                                </Label>
                                <PasswordInput
                                    id="password"
                                    value={data.password} onChange={e => setData('password', e.target.value)}
                                    required />
                                {errors.password && <div>{errors.password}</div>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={processing} className="ltr:ml-auto rtl:mr-auto">{__("Submit")}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </ContentLayout>
    )
}

