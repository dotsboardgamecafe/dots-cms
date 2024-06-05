'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, SearchNormal1, Setting4 } from 'iconsax-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { RewardAddForm } from '@/components/PageComponents/RewardPage/RewardAddForm/RewardAddForm';
import { RewardEditForm } from '@/components/PageComponents/RewardPage/RewardEditForm/RewardEditForm';
import RewardView from '@/components/PageComponents/RewardPage/RewardView';
import { Button } from '@/components/ui/Buttons';
import Text from '@/components/ui/Input/Text';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { formatDate } from '@/helper/datetime';

import { Pagination as PaginationType } from '@/types/network';
import { RewardType } from '@/types/rewards';
import { TierType } from '@/types/tier';

type Props = {
  data: RewardType[];
  pagination: PaginationType;
  tiers: TierType[];
};


const RewardTable = ( { data, pagination, tiers }: Props ) => {
  const [ addModalOpen, setAddModalOpen ] = useState( false );
  const [ editModalOpen, setEditModalOpen ] = useState( false );


  const columns: ColumnDef<RewardType>[] = useMemo( () => [
    {
      accessorKey: 'name',
      header: 'Voucher Reward',
      cell: ( { row } ) => {
        return (
          <div className='flex flex-row gap-2'>
            { row.original.image_url && <Image src={ row.original.image_url } width={ 73 } height={ 36 } alt='Voucher Image' /> }
            <Typography variant='paragraph-l-regular'>
              { row.original.name }
            </Typography>
          </div>
        );
      }
    },
    {
      accessorKey: 'category_type',
      header: 'Category Voucher',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.category_type }
          </Typography>
        );
      }
    },
    {
      header: 'Tier',
      cell: ( { row } ) => {
        return (
          <>
            <div className='flex flex-row gap-2 flex-wrap'>
              <div className='bg-gray-100 rounded-xl px-4'>
                <Typography variant='paragraph-l-regular' >
                  { row.original.Tier.name }
                </Typography>
              </div>
            </div>
          </>
        );
      }
    },
    {
      accessorKey: 'voucher_code',
      header: 'Manual Code',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { row.original.voucher_code || '-' }
          </Typography>
        );
      }
    },
    {
      accessorKey: 'expired_date',
      header: 'Expire Date',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { formatDate( row.original.expired_date ) }
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
                  }, 'capitalize'
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
  ], [] );

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
        <Button variant="default" size="lg" className='gap-2'>
          <Typography variant='paragraph-l-bold' className='text-white'>
            Redeem Voucher
          </Typography>
        </Button>
        <Button variant="default" size="lg" className='gap-2' onClick={ () => setAddModalOpen( true ) }>
          <AddCircle className='text-white' />
          <Typography variant='paragraph-l-bold' className='text-white'>
            Add New Voucher
          </Typography>
        </Button>
        <Button variant="secondary" size="lg" className='w-[160px]'>
          <Setting4 />
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
      <Pagination pagination={ pagination } />

      <Modal open={ addModalOpen } onOpenChange={ setAddModalOpen } >
        <ModalContent hideCloseIcon>
          <ModalHeader>
            <ModalTitle>
              <Typography variant='heading-h4'>
                Add New Voucher
              </Typography>
            </ModalTitle>
          </ModalHeader>
          <Separator />
          <RewardAddForm tiers={ tiers } onClose={ () => setAddModalOpen( false ) } />
        </ModalContent>
      </Modal>
      <Modal open={ editModalOpen } onOpenChange={ setEditModalOpen } >
        <ModalContent hideCloseIcon>
          <ModalHeader>
            <ModalTitle>
              <Typography variant='heading-h4'>
                Edit Voucher
              </Typography>
            </ModalTitle>
          </ModalHeader>
          <Separator />
          <RewardEditForm tiers={ tiers } onClose={ () => setEditModalOpen( false ) } />
        </ModalContent>
      </Modal>
      <Modal open={ editModalOpen } onOpenChange={ setEditModalOpen } >
        <ModalContent hideCloseIcon>
          <ModalHeader>
            <ModalTitle>
              <Typography variant='heading-h4'>
                Edit Voucher
              </Typography>
            </ModalTitle>
          </ModalHeader>
          <Separator />
          <RewardView />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RewardTable;