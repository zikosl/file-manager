import { columns } from "@/components/table/columns/users";
import { DataTable } from "@/components/table/data-table";
import { User } from "@/data/schema";
import { ContentLayout } from "@/layout/admin/content-layout";
import { __ } from "@/lib/lang";
import { usePage } from "@inertiajs/react";

export default function Users() {

    const { users } = usePage<
        {
            users: User[]
        }
    >().props
    return (
        <ContentLayout title={__("Users")}>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>
                        {__("Users List")}
                    </h2>
                    < p className='text-muted-foreground' >
                        {__("Here's a list of all users")}
                    </p>
                </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable data={users} columns={columns} />
            </div>
        </ContentLayout>
    )
}

