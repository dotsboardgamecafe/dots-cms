'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { AddCircle, Edit, Eye } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import StatusConfirmationModal from '@/components/PageComponents/RoomPage/StatusConfirmationModal';
import Search from '@/components/ui/Input/Search';
import PaginationDeprecated from '@/components/ui/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { snakeCaseToString } from '@/helper/string';

import { Pagination as PaginationType } from '@/types/network';
import { RoomType } from '@/types/room';

dayjs.extend(dayjsFormats);


type Props = {
  data: RoomType[];
  pagination: PaginationType;
};

const RoomTable = ({ data, pagination }: Props) => {
  const [statusConfirmationModalOpen, setStatusConfirmationModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<RoomType>();
  const router = useRouter();

  const getRoomStatus = (roomData: RoomType): string => {
    if (roomData.status !== 'active') return roomData.status
    const isAlreadyPast = dayjs(roomData.end_date).isBefore(dayjs())

    if (isAlreadyPast) return 'inactive'
    return roomData.status
  }

  const columns: ColumnDef<RoomType>[] = useMemo(() => [
    {
      accessorKey: 'type',
      header: 'Room Type',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {snakeCaseToString(row.original.room_type)}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'gameName',
      header: 'Game Name',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {row.original.name}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'schedule',
      header: 'Schedule',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {dayjs(row.original.start_date).format('ddd Do, HH:mm')} - {dayjs(row.original.end_date).format('HH:mm')}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.cafe_name}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'level',
      header: 'Level',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {row.original.difficulty}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'slot',
      header: 'Updated Slot',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.current_used_slot} / {row.original.maximum_participant}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'gameMaster',
      header: 'Game Master',
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-[10px]'>
            <Image width={36} height={36} src={row.original.game_master_image_url || '/images/avatar-not-found.png'} alt='profile image' className='rounded-full' />
            <Typography variant='paragraph-l-regular'>
              {row.original.game_master_name}
            </Typography>
          </div>
        );
      }
    },
    {
      accessorKey: 'status',
      accessorFn: (row) => row.status,
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Select value={getRoomStatus(row.original)}
            disabled={getRoomStatus(row.original) === 'inactive' || row.original.current_used_slot > 0}
            onValueChange={(value) => {
              if (value === 'inactive') {
                setStatusConfirmationModalOpen(true);
                setSelectedRow(row.original);
              }
            }}
          >
            <SelectTrigger variant='badge' className={cn(
              {
                'bg-error-50': getRoomStatus(row.original) === 'inactive',
                'bg-blue-50': getRoomStatus(row.original) === 'active'
              }
            )}>
              <SelectValue aria-label={getRoomStatus(row.original)}>
                <Typography variant='text-body-l-medium' className={cn(
                  'capitalize',
                  {
                    'text-error-700': getRoomStatus(row.original) === 'inactive',
                    'text-blue-700': getRoomStatus(row.original) === 'active'
                  }
                )}>
                  {getRoomStatus(row.original)}
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
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-4'>
            <Link href={`/room/view/${row.original.room_code}`} >
              <Eye className='cursor-pointer' />
            </Link>
            <Link href={`/room/edit/${row.original.room_code}`} >
              <Edit className='cursor-pointer' />
            </Link>
          </div>
        );
      }
    }
  ]
    , []);


  const table = useReactTable({
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns,
  });

  const getMaxPage = () => {
    if (pagination.count && pagination.limit) {
      return Math.ceil(pagination?.count / pagination?.limit);
    }
    return 1;
  };


  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Search />
        <Link href='/room/add'>
          <button className="rounded-[8px] gap-[8px] px-5 py-3 bg-button-midnight-black flex flex-row items-center text-nowrap">
            <AddCircle className='text-white' />
            <Typography variant='paragraph-l-bold' className='text-white'>
              Add New Room
            </Typography>
          </button>
        </Link>
      </section>
      <Table>
        <TableHeader>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))
          }
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationDeprecated
        totalPages={getMaxPage()}
        currentPage={pagination.page}
        itemsPerPage={pagination.limit ?? 0}
        totalItems={pagination.count ?? 0}
        onChangeItemsPerPage={(items) => {
          router.push(`/room?page=1&limit=${items}`);
          table.setPageSize(items);
        }}
        onNext={() => router.push(`/room?page=${(pagination.page ?? 1) + 1}`)}
        onPrevious={() => router.push(`/room?page=${(pagination.page ?? 1) - 1}`)}
        prevDisabled={pagination.page === 1}
        nextDisabled={pagination.page === getMaxPage()}
        onChangePage={(page) => router.push(`/room?page=${page}`)}
        from={table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
        to={table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize}
      />
      <StatusConfirmationModal
        open={statusConfirmationModalOpen}
        onOpenChange={(value) => setStatusConfirmationModalOpen(value)}
        roomData={selectedRow}
      />
    </div>
  );
};

export default RoomTable;