import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, SearchNormal1 } from 'iconsax-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import Text from '@/components/ui/Input/Text';
import Pagination from '@/components/ui/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { RoomType } from '@/types/room';

// type Props = PropsWithRef<PropsWithChildren<{
//   data: RoomType[];
// }>>;


const dummyData: RoomType[] = Array.from( { length: 20 } ).map( () => ( {
  type: [ 'General Room', 'Special Event', 'Event Room', 'Closed Room' ][ Math.floor( Math.random() * 4 ) ],
  gameName: [ 'Rising Sun', 'Dungeons & Dragons', 'ISS Vanguard', 'Splendor', 'China Town', 'Spyfall' ][ Math.floor( Math.random() * 6 ) ],
  schedule: `${[ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][ Math.floor( Math.random() * 12 ) ]} ${Math.floor( Math.random() * 28 ) + 1}${Math.floor( Math.random() * 10 ) === 0 ? 'th' : Math.floor( Math.random() * 10 ) >= 1 ? 'st' : 'nd'}${Math.floor( Math.random() * 10 ) === 0 ? 'th' : 'rd'} ${Math.floor( Math.random() * 24 )}:${String( Math.floor( Math.random() * 60 ) ).padStart( 2, '0' )} - ${Math.floor( Math.random() * 24 ) + 1}${Math.floor( Math.random() * 10 ) === 0 ? ':00' : ':'}${String( Math.floor( Math.random() * 60 ) ).padStart( 2, '0' )}`,
  location: [ 'Bandung, Paskal', 'Jakarta, PIK' ][ Math.floor( Math.random() * 2 ) ],
  level: [ 'Beginner', 'Intermediate', 'Advanced' ][ Math.floor( Math.random() * 3 ) ],
  slot: `${Math.floor( Math.random() * 10 ) + 1}/${Math.floor( Math.random() * 20 ) + 1} Players`,
  status: [ 'Active', 'Closed' ][ Math.floor( Math.random() * 2 ) ],
  gameMaster: {
    name: `${[ 'Henry', 'Smith', 'Johnson' ][ Math.floor( Math.random() * 3 ) ]}`,
    profileImage: 'https://i.pravatar.cc/500'
  }
} ) );

const columns: ColumnDef<RoomType>[] = [
  {
    accessorKey: 'type',
    header: 'Room Type',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.type }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'gameName',
    header: 'Game Name',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.gameName }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'schedule',
    header: 'Schedule',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.schedule }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.location }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.level }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'slot',
    header: 'Updated Slot',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.slot }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'gameMaster',
    header: 'Game Master',
    cell: ( { row } ) => {
      return (
        <div className='flex flex-row items-center gap-[10px]'>
          <Image width={ 36 } height={ 36 } src={ row.original.gameMaster.profileImage } alt='profile image' className='rounded-full' />
          <Typography variant='paragraph-l-regular'>
            { row.original.gameMaster.name }
          </Typography>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ( { row } ) => {
      return (
        <Select value={ row.original.status }>
          <SelectTrigger variant='badge' className={ cn(
            {
              'bg-error-50': row.original.status === 'Closed',
              'bg-blue-50': row.original.status === 'Active'
            }
          ) }>
            <SelectValue aria-label={ row.original.status }>
              <Typography variant='text-body-l-medium' className={ cn(
                {
                  'text-error-700': row.original.status === 'Closed',
                  'text-blue-700': row.original.status === 'Active'
                }
              ) }>
                { row.original.status }
              </Typography>
            </SelectValue>
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>

      );
    }
  },
  {
    id: 'action',
    header: 'Action',
    cell: ( { row } ) => {
      return (
        <div className='flex flex-row items-center gap-4'>
          <Eye className='cursor-pointer' />
          <Edit className='cursor-pointer' />
        </div>
      );
    }
  }
];

const RoomTable = () => {
  const table = useReactTable( {
    data: dummyData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns,
  } );

  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Text className='max-w-[300px]' prefixIcon={ <SearchNormal1 size={ 20 } className='text-gray-500 ' /> } placeholder='Search...' />
        <button
          className="rounded-[8px] gap-[8px] px-5 py-3 bg-button-midnight-black flex flex-row items-center text-nowrap"
        >
          <AddCircle className='text-white' />
          <Typography variant='paragraph-l-bold' className='text-white'>
            Add New Room
          </Typography>
        </button>
      </section>
      <Table>
        <TableHeader>
          {
            table.getHeaderGroups().map( ( headerGroup ) => (
              <TableRow key={ headerGroup.id }>
                { headerGroup.headers.map( ( header ) => {
                  return (
                    <TableHead key={ header.id }>
                      { header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) }
                    </TableHead>
                  );
                } ) }
              </TableRow>
            ) )
          }
        </TableHeader>
        <TableBody>
          { table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map( ( row ) => (
              <TableRow
                key={ row.id }
                data-state={ row.getIsSelected() && "selected" }
              >
                { row.getVisibleCells().map( ( cell ) => (
                  <TableCell key={ cell.id }>
                    { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
                  </TableCell>
                ) ) }
              </TableRow>
            ) )
          ) : (
            <TableRow>
              <TableCell colSpan={ columns.length } className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
      <Pagination
        totalPages={ table.getPageCount() }
        currentPage={ table.getState().pagination.pageIndex + 1 }
        itemsPerPage={ table.getState().pagination.pageSize }
        totalItems={ table.getFilteredRowModel().rows.length }
        onChangeItemsPerPage={ ( items ) => table.setPageSize( items ) }
        onNext={ () => table.nextPage() }
        onPrevious={ () => table.previousPage() }
        prevDisabled={ !table.getCanPreviousPage() }
        nextDisabled={ !table.getCanNextPage() }
        onChangePage={ ( page ) => table.setPageIndex( page ) }
        from={ table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 }
        to={ table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize }
      />
    </div>
  );
};

export default RoomTable;