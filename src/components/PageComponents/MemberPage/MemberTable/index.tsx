'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Eye, ReceiptItem, Setting4, Trash } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithRef, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import DeleteConfirmationModal from '@/components/PageComponents/MemberPage/ConfirmationModal/DeleteConfirmationModal';
import StatusConfirmationModal from '@/components/PageComponents/MemberPage/ConfirmationModal/StatusConfirmationModal';
import MemberDetailModal from '@/components/PageComponents/MemberPage/DetailModal';
import MemberFilterModal from '@/components/PageComponents/MemberPage/FilterModal';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { MemberType } from '@/types/member';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: MemberType[];
  pagination: PaginationRes;
}>;

const MemberTable = ({ data, pagination }: Props) => {
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState<boolean>(false);
  const [changeStatusConfirmationModalOpen, setChangeStatusConfirmationModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<MemberType>();
  const columns: ColumnDef<MemberType>[] = [
    {
      accessorKey: 'username',
      header: 'User Name',
      cell: ({ row }) => {
        return (
          <section className='flex flex-row items-center gap-[10px]'>
            <Image
              src={row.original.image_url || '/images/avatar-not-found.png'}
              alt={row.original.username + '-img-pic'}
              width={32}
              height={32}
            />
            <Typography variant='paragraph-l-regular'>
              {row.original.username || '-'}
            </Typography>
          </section>
        );
      }
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.email || '-'}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone Number',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.phone_number || '-'}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'latest_tier',
      header: 'Tier Level',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.latest_tier || '-'}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'total_spent',
      header: 'Total Spent',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            Rp {row.original.total_spent || '0'}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Select
            value={row.original.status}
            disabled={row.original.status === 'deleted'}
            onValueChange={() => {
              setChangeStatusConfirmationModalOpen(true)
              setSelectedRow(row.original)
            }}
          >
            <SelectTrigger variant='badge' className={cn(
              {
                'bg-error-50': row.original.status === 'inactive',
                'bg-blue-50': row.original.status === 'active'
              }
            )}>
              <SelectValue aria-label={row.original.status} >
                <Typography variant='text-body-l-medium' className={cn(
                  'capitalize',
                  {
                    'text-error-700': row.original.status === 'inactive',
                    'text-blue-700': row.original.status === 'active'
                  }
                )}>
                  {row.original.status}
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
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-4' >
            <Link className='p-0' href={`/member/invoices/${row.original.user_code}`}>
              <ReceiptItem />
            </Link>
            <Button className='p-0' variant='link' onClick={() => {
              onClickDetail(row.original);
            }}>
              <Eye />
            </Button>
            <Button className='p-0' variant='link' onClick={() => {
              setDeleteConfirmationModalOpen(true);
              setSelectedRow(row.original);
            }}>
              <Trash className='cursor-pointer' />
            </Button>
          </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns,
  });

  const onClickDetail = (row: MemberType) => {
    setDetailModalOpen(true);
    setSelectedRow(row);
  };

  useEffect(() => {
    if (!pagination.limit) return
    table.setPageSize(pagination.limit)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.limit])

  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Search />
        <Button variant="secondary" size="md" onClick={() => setFilterModalOpen(true)}>
          <Setting4 size={20} />
          <Typography variant='paragraph-l-bold'>
            Filter
          </Typography>
        </Button>
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
      <Pagination pagination={pagination}
      />
      <MemberFilterModal open={filterModalOpen} onOpenChange={(value) => setFilterModalOpen(value)} />
      <MemberDetailModal open={detailModalOpen} onOpenChange={(value) => setDetailModalOpen(value)} memberData={selectedRow} />
      <StatusConfirmationModal
        open={changeStatusConfirmationModalOpen}
        onOpenChange={(value) => setChangeStatusConfirmationModalOpen(value)}
        memberData={selectedRow}
      />
      <DeleteConfirmationModal
        open={deleteConfirmationModalOpen}
        onOpenChange={(value) => setDeleteConfirmationModalOpen(value)}
        memberData={selectedRow}
      />
    </div>
  );
};

export default MemberTable;