'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { AddCircle, Edit, Eye, SearchNormal1 } from 'iconsax-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import AddCafeModal from '@/components/PageComponents/CafePage/Add';
import Text from '@/components/ui/Input/Text';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { CafeType } from '@/types/cafes';
import { Pagination as PaginationType } from '@/types/network';

dayjs.extend( dayjsFormats );


type Props = {
  data: CafeType[];
  pagination: PaginationType;
};

const CafeTable = ( { data, pagination }: Props ) => {
  const [ statusConfirmationModalOpen, setStatusConfirmationModalOpen ] = useState<boolean>( false );
  const [ selectedRow, setSelectedRow ] = useState<CafeType>();
  const [ keyword, setKeyword ] = useState<string>( '' );

  const [ addModalOpen, setAddModalOpen ] = useState( false );

  const router = useRouter();
  const searchParams = useSearchParams();
  const columns: ColumnDef<CafeType>[] = useMemo( () => [
    {
      header: 'Name',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.name }
          </Typography>
        );
      }
    },
    {
      header: 'Description',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.description }
          </Typography>
        );
      }
    },
    {
      header: 'Address',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { row.original.address }
          </Typography>
        );
      }
    },
    {
      header: 'City',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.city }
          </Typography>
        );
      }
    },
    {
      header: 'Province',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.province }
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
            onValueChange={ ( value ) => {
              if ( value === 'inactive' ) {
                setStatusConfirmationModalOpen( true );
                setSelectedRow( row.original );
              }
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
              <SelectItem value="inactive">In-Active</SelectItem>
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
            <Link href={ `/tier/view/${row.original.cafe_code}` } >
              <Eye className='cursor-pointer' />
            </Link>
            <Link href={ `/tier/edit/${row.original.cafe_code}` } >
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

  const onChangeKeyword = ( evt: ChangeEvent<HTMLInputElement> ) => {
    const { value } = evt.target;
    setKeyword( value );
    const params = new URLSearchParams( searchParams );
    params.set( 'keyword', value );
    router.push( '/cafe?' + params.toString() );
  };


  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Text className='max-w-[300px]' value={ keyword } onChange={ onChangeKeyword } prefixIcon={ <SearchNormal1 size={ 20 } className='text-gray-500 ' /> } placeholder='Search...' />
        <button className="rounded-[8px] gap-[8px] px-5 py-3 bg-button-midnight-black flex flex-row items-center text-nowrap" onClick={ () => setAddModalOpen( true ) }>
          <AddCircle className='text-white' />
          <Typography variant='paragraph-l-bold' className='text-white'>
            Add New Cafe
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
      <Pagination pagination={ pagination } />
      <AddCafeModal
        onOpenChange={ ( value ) => setAddModalOpen( value ) }
        open={ addModalOpen }
      />
      {/* 
      <StatusConfirmationModal
        open={ statusConfirmationModalOpen }
        onOpenChange={ ( value ) => setStatusConfirmationModalOpen( value ) }
        tournamentData={ selectedRow }
      /> */}
    </div>
  );
};

export default CafeTable;