import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '../data-table-column-header'
import { DataTableRowActions } from '../actions/spaces'

import { Space } from '@/data/schema'
import { Badge } from '@/components/ui/badge'
import { __ } from '@/lib/lang'

export const columns: ColumnDef<Space>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='' />
    ),
    cell: ({ row }) =>
      <Badge
        style={{ backgroundColor: "#" + row.original.color }}
        className='text-white shadow-none'
      >
        <div >SP_{row.getValue('id')}</div>
      </Badge>
    ,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={__("Name")} />
    ),
    cell: ({ row }) => {

      return (
        <div className='flex space-x-2'>
          <div className={`w-4 h-4 rounded-sm bg-[${row.original.color}]`}>
          </div>

          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
