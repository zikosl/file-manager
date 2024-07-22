

import { ContentLayout } from "@/layout/admin/content-layout";


import {
    Activity,
    ArrowUpRight,

    OrbitIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Link, usePage } from "@inertiajs/react";
import { Space, User } from "@/types";
import { Files } from "@/components/folder/table";
import { IconFiles, IconUsers } from "@tabler/icons-react";
import dayjs from "dayjs";
import { FileIconCustom } from "@/lib/extensions";

export default function Dashboard() {
    const { users, spaces, files, auth } = usePage<{
        users: User[],
        spaces: Space[],
        files: Files[],
        auth: {
            user: any
        }
    }>().props
    return (
        <ContentLayout title="Dashboard">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Admin</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground">
                                {auth.user.name}
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Accounts
                            </CardTitle>
                            <IconUsers className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.length}</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Files
                            </CardTitle>
                            <IconFiles className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{files.length}</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Spaces</CardTitle>
                            <OrbitIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{spaces.length}</div>
                        </CardContent>
                    </Card>

                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Last User</CardTitle>
                                <CardDescription>
                                    List of all last created users .
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                <Link href={route("admin.users")}>
                                    View All
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Users</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Date
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        users.map((v, i) => <TableRow key={i}>
                                            <TableCell>
                                                <div className="font-medium">{v.name}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    {v.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {dayjs().format("DD, MMM YYYY")}
                                            </TableCell>
                                        </TableRow>)
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Recent Files</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            {
                                files.map((v) => {
                                    const fileExtension = v.name.split(".")[v.name.split(".").length - 1];
                                    return <div className="flex items-center gap-4">
                                        <div className="h-7 w-7">
                                            <FileIconCustom extension={fileExtension} />
                                        </div>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                {v.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {Math.round(v.size / 1024)} Ko
                                            </p>
                                        </div>
                                    </div>
                                })
                            }
                        </CardContent>
                    </Card>
                </div>
            </main>
        </ContentLayout>
    )
}
