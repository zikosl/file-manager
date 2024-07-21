import { columns } from "@/components/table/columns/spaces";
import { DataTable } from "@/components/table/data-table";
import { ContentLayout } from "@/layout/admin/content-layout";
import { Space } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Spaces() {

    const { spaces } = usePage<{
        spaces: Space[]
    }>().props
    return (
        <ContentLayout title="Spaces">
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Spaces List</h2>
                    <p className='text-muted-foreground'>
                        Here&apos;s a list of all spaces
                    </p>
                </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable data={spaces} columns={columns} />
            </div>
        </ContentLayout>
    )
}

