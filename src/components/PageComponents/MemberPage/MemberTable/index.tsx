'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Eye, SearchNormal1, Setting4 } from 'iconsax-react';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, PropsWithRef, useState } from 'react';

import { cn } from '@/lib/utils';

import MemberDetailModal from '@/components/PageComponents/MemberPage/DetailModal';
import MemberFilterModal from '@/components/PageComponents/MemberPage/FilterModal';
import StatusConfirmationModal from '@/components/PageComponents/MemberPage/StatusConfirmationModal';
import { Button } from '@/components/ui/Buttons';
import Text from '@/components/ui/Input/Text';
import PaginationDeprecated from '@/components/ui/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { MemberType } from '@/types/member';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: MemberType[];
  pagination: PaginationRes;
}>;





const MemberTable = ( { data, pagination }: Props ) => {
  const [ filterModalOpen, setFilterModalOpen ] = useState<boolean>( false );
  const [ detailModalOpen, setDetailModalOpen ] = useState<boolean>( false );
  const [ confirmationModalOpen, setConfirmationModalOpen ] = useState<boolean>( false );
  const [ selectedRow, setSelectedRow ] = useState<MemberType>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const columns: ColumnDef<MemberType>[] = [
    {
      accessorKey: 'username',
      header: 'User Name',
      cell: ( { row } ) => {
        return (
          <section className='flex flex-row items-center gap-[10px]'>
            <Image
              src={ row.original.image_url || '/images/avatar-not-found.png' }
              alt={ row.original.username + '-img-pic' }
              width={ 32 }
              height={ 32 }
            />
            <Typography variant='paragraph-l-regular'>
              { row.original.username || '-' }
            </Typography>
          </section>
        );
      }
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { row.original.email || '-' }
          </Typography>
        );
      }
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone Number',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { row.original.phone_number || '-' }
          </Typography>
        );
      }
    },
    {
      accessorKey: 'latest_tier',
      header: 'Tier Level',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { row.original.latest_tier || '-' }
          </Typography>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ( { row } ) => {
        return (
          <Select value={ row.original.status } onValueChange={ ( value ) => {
            if ( value === 'inactive' ) {
              setConfirmationModalOpen( true );
              setSelectedRow( row.original );
            }
          } }>
            <SelectTrigger variant='badge' className={ cn(
              {
                'bg-error-50': row.original.status === 'inactive',
                'bg-blue-50': row.original.status === 'active'
              }
            ) }>
              <SelectValue aria-label={ row.original.status } >
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
            <SelectContent>
              <SelectItem value="active" className='capitalize'>Active</SelectItem>
              <SelectItem value="inactive" className='capitalize'>In-Active</SelectItem>
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
          <div className='flex flex-row items-center gap-4 cursor-pointer' onClick={ () => {
            onClickDetail( row.original );
          } }>
            <Eye />
          </div>
        );
      }
    }
  ];

  const table = useReactTable( {
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns,
  } );

  const onClickDetail = ( row: MemberType ) => {
    setDetailModalOpen( true );
    setSelectedRow( row );
  };

  const onSearchKeyword = ( evt: ChangeEvent<HTMLInputElement> ) => {
    const { value } = evt.target;
    debounced( value );
  };
  const onDebounced = ( value: string ) => {
    const params = new URLSearchParams( searchParams );
    params.set( 'keyword', value );
    router.push( '/member?' + params.toString() );
  };

  const debounced = debounce( onDebounced, 500 );
  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Text className='max-w-[300px]' prefixIcon={ <SearchNormal1 size={ 20 } className='text-gray-500 ' /> } placeholder='Search...' onChange={ onSearchKeyword } />
        <Button variant="secondary" size="md" onClick={ () => setFilterModalOpen( true ) }>
          <Setting4 size={ 20 } />
          <Typography variant='paragraph-l-bold'>
            Filter
          </Typography>
        </Button>
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
      <PaginationDeprecated
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
      <MemberFilterModal open={ filterModalOpen } onOpenChange={ ( value ) => setFilterModalOpen( value ) } />
      <MemberDetailModal open={ detailModalOpen } onOpenChange={ ( value ) => setDetailModalOpen( value ) } memberData={ selectedRow } />
      <StatusConfirmationModal
        open={ confirmationModalOpen }
        onOpenChange={ ( value ) => setConfirmationModalOpen( value ) }
        memberData={ selectedRow }
      />
    </div>
  );
};

export default MemberTable;