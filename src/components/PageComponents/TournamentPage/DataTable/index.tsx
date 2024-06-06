'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { AddCircle, Edit, Eye } from 'iconsax-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import StatusConfirmationModal from '@/components/PageComponents/TournamentPage/StatusConfirmationModal';
import Search from '@/components/ui/Input/Search';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { formatTournamentDate } from '@/helper/datetime';

import { Pagination as PaginationType } from '@/types/network';
import { TournamentType } from '@/types/tournament';

dayjs.extend( dayjsFormats );


type Props = {
  data: TournamentType[];
  pagination: PaginationType;
};

const TournamentTable = ( { data, pagination }: Props ) => {
  const [ statusConfirmationModalOpen, setStatusConfirmationModalOpen ] = useState<boolean>( false );
  const [ selectedRow, setSelectedRow ] = useState<TournamentType>();
  const columns: ColumnDef<TournamentType>[] = useMemo( () => [
    {
      header: 'Tournament Title',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.name }
          </Typography>
        );
      }
    },
    {
      header: 'Level',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.difficulty }
          </Typography>
        );
      }
    },
    {
      header: 'Date',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { formatTournamentDate( row.original.start_date, row.original.end_date ) }
          </Typography>
        );
      }
    },
    {
      header: 'Time',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { `${row.original.start_time} - ${row.original.end_time}` }
          </Typography>
        );
      }
    },
    {
      header: 'Location',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.cafe_name }
          </Typography>
        );
      }
    },
    {
      header: 'Updated Slot',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { row.original.current_used_slot } / { row.original.player_slot } Players
          </Typography>
        );
      }
    },
    {
      accessorKey: 'status',
      accessorFn: ( row ) => row.status,
      header: 'Status',
      cell: ( { row } ) => {
        return (
          <Select value={ row.original.status }
            disabled={ row.original.status === 'inactive' }
            onValueChange={ () => {
              setStatusConfirmationModalOpen( true );
              setSelectedRow( row.original );
            } }
          >
            <SelectTrigger variant='badge' className={ cn(
              {
                'bg-error-50': row.original.status === 'inactive',
                'bg-blue-50': row.original.status === 'active'
              }
            ) }>
              <SelectValue aria-label={ row.original.status }>
                <Typography variant='text-body-l-medium' className={ cn(
                  'capitalize',
                  {
                    'text-error-700': row.original.status === 'inactive',
                    'text-blue-700': row.original.status === 'active'
                  }
                ) }>
                  { row.original.status }
                </Typography>
              </SelectValue>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Close Registration</SelectItem>
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
            <Link href={ `/tournament/view/${row.original.tournament_code}` } >
              <Eye className='cursor-pointer' />
            </Link>
            <Link href={ `/tournament/edit/${row.original.tournament_code}` } >
              <Edit className='cursor-pointer' />
            </Link>
          </div>
        );
      }
    }
  ]
    , [] );

  const table = useReactTable( {
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    columns,
  } );

  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Search />
        <Link href='/tournament/add'>
          <button className="rounded-[8px] gap-[8px] px-5 py-3 bg-button-midnight-black flex flex-row items-center text-nowrap">
            <AddCircle className='text-white' />
            <Typography variant='paragraph-l-bold' className='text-white'>
              Add New Tournament
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
      <Pagination pagination={ pagination } />

      <StatusConfirmationModal
        open={ statusConfirmationModalOpen }
        onOpenChange={ ( value ) => setStatusConfirmationModalOpen( value ) }
        tournamentData={ selectedRow }
      />
    </div>
  );
};

export default TournamentTable;