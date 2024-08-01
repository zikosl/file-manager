import { Link, useForm } from '@inertiajs/react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { __ } from '@/lib/lang'
import LanguageToggle from '@/components/language-toggle'

export default function Login() {

    const { data, setData, post, processing, errors } = useForm({
        email: 'zakaria@gmail.com',
        password: '12345678',
        remember: false,
    })

    function submit(e: any) {
        e.preventDefault()
        post('/login')
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex rtl:order-1 flex-col items-center justify-center py-12">
                <form onSubmit={submit} className='flex flex-1 items-center'>
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">{__("Login")}</h1>
                            <p className="text-balance text-muted-foreground">
                                {__("Enter your email below to login to your account")}
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">{__("Email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name='email'
                                    placeholder="m@example.com"
                                    required
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <div className='text-red-500 text-sm'>{errors.email}</div>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">{__("Password")}</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline"
                                    >
                                        {__("Forgot your password?")}
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name='password'
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                />
                                {errors.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {__("Login")}
                            </Button>
                        </div>

                    </div>
                </form>
                <LanguageToggle />
            </div>
            <div className="hidden rtl:order-2 bg-muted lg:block">
                <img
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
