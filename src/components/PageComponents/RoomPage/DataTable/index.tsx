'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { AddCircle, Edit, Eye, Setting4, Trash } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import DeleteConfirmationModal from '@/components/PageComponents/RoomPage/ConfirmationModal/DeleteConfirmationModal';
import StatusConfirmationModal from '@/components/PageComponents/RoomPage/ConfirmationModal/StatusConfirmationModal';
import RoomFilterModal from '@/components/PageComponents/RoomPage/FilterModal/RoomFilterModal';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { formatTimeHourMinutes } from '@/helper/datetime';
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
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<RoomType>();
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)

  const getRoomStatus = (roomData: RoomType): string => {
    if (roomData.status !== 'active') return roomData.status
    const isAlreadyPast = checkIsPastDate(dayjs(`${roomData.end_date} ${roomData.end_time}`))
    if (isAlreadyPast) return 'inactive'
    return roomData.status
  }

  function checkIsPastDate(date: dayjs.Dayjs): boolean {
    return dayjs(date).isBefore(dayjs())
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
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {dayjs(row.original.start_date).format('ddd, DD MMM YYYY')}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'time',
      header: 'Time',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {formatTimeHourMinutes(row.original.start_time)} - {formatTimeHourMinutes(row.original.end_time)}
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
            disabled={
              row.original.status === 'closed' ||
              (row.original.status === 'active' && row.original.current_used_slot > 0) ||
              checkIsPastDate(dayjs(`${row.original.end_date} ${row.original.end_time}`))
            }
            onValueChange={() => {
              setStatusConfirmationModalOpen(true);
              setSelectedRow(row.original);
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
            {(getRoomStatus(row.original) !== 'closed' && !(row.original.status === 'active' && row.original.current_used_slot > 0)) && (
              <Button className='p-0' variant='link' onClick={() => {
                setDeleteConfirmationModalOpen(true);
                setSelectedRow(row.original);
              }}>
                <Trash className='cursor-pointer' />
              </Button>
            )}
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

  useEffect(() => {
    if (!pagination.limit) return
    table.setPageSize(pagination.limit)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.limit])


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
        <button className="rounded-[8px] gap-[8px] px-5 py-3 border-gray-300 border flex flex-row items-center text-nowrap" onClick={() => setIsOpenFilter(true)}>
          <Setting4 />
          <Typography variant='paragraph-l-bold'>
            Filter
          </Typography>
        </button>
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
      <Pagination pagination={pagination} />
      <StatusConfirmationModal
        open={statusConfirmationModalOpen}
        onOpenChange={(value) => setStatusConfirmationModalOpen(value)}
        roomData={selectedRow}
      />
      <DeleteConfirmationModal
        open={deleteConfirmationModalOpen}
        onOpenChange={(value) => setDeleteConfirmationModalOpen(value)}
        roomData={selectedRow}
      />
      <RoomFilterModal
        open={isOpenFilter}
        onOpenChange={(isOpenFilter) => setIsOpenFilter(isOpenFilter)}
      />
    </div>
  );
};

export default RoomTable;