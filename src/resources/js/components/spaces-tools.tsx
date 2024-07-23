import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

import { Button } from '@/components/custom/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Space } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { OrbitIcon } from 'lucide-react'
import { IconCircleDot } from '@tabler/icons-react'



export function SpacesTools() {
    const { spaces, space } = usePage<{
        spaces: Space[],
        space: Space
    }>().props
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline'
                    size='sm'
                    className='ml-auto h-8 flex capitalize'
                >
                    <OrbitIcon color={"#" + space.color} className='mr-2 h-4 w-4' />
                    {space.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[150px]'>
                <DropdownMenuLabel className='text-sm'>Select Space</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {spaces
                    .map((column) => {
                        return (
                            <DropdownMenuItem
                                key={column.id}
                                className='capitalize cursor-pointer gap-2'
                                onClick={() => router.get(route("client.spaces", column.id))}
                            >
                                <IconCircleDot size={14} color={"#" + column.color} />
                                {column.name}
                            </DropdownMenuItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
