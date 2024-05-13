'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, SearchNormal1 } from 'iconsax-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import Text from '@/components/ui/Input/Text';
import Pagination from '@/components/ui/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { GameType } from '@/types/game';
import { Pagination as PaginationType } from '@/types/network';

type Props = {
  data: GameType[];
  pagination: PaginationType;
};

const columns: ColumnDef<GameType>[] = [
  {
    accessorKey: 'name',
    header: 'Game Name',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.name }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'game_type',
    header: 'Type',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular' className='capitalize'>
          { row.original.game_type }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'game_categories',
    header: 'Mechanics',
    cell: ( { row } ) => {
      return (
        <>
          { row.original.game_categories.map( ( category, index ) => (
            <div className='bg-gray-100 rounded-xl'>
              <Typography variant='paragraph-l-regular' key={ `game-mechanics-${index}` }>
                { category.category_name }
              </Typography>
            </div>
            
          ) ) }
        </>
      );
    }
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.duration }
        </Typography>
      );
    }
  },
  {
    accessorKey: 'cafe_name',
    header: 'Location',
    cell: ( { row } ) => {
      return (
        <Typography variant='paragraph-l-regular'>
          { row.original.cafe_name }
        </Typography>
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

const GameTable = ( { data }: Props ) => {

  const table = useReactTable( {
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns,
  } );

  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Text className='max-w-[300px]' prefixIcon={ <SearchNormal1 size={ 20 } className='text-gray-500 ' /> } placeholder='Search...' />
        <Link href='/game/add'>
          <button className="rounded-[8px] gap-[8px] px-5 py-3 bg-button-midnight-black flex flex-row items-center text-nowrap">
            <AddCircle className='text-white' />
            <Typography variant='paragraph-l-bold' className='text-white'>
              Add New Game
            </Typography>
          </button>
        </Link>
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

export default GameTable;