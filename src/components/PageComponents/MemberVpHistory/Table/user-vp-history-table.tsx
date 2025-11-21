'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { PropsWithRef, useEffect, useMemo } from 'react';

import Pagination from '@/components/ui/Pagination/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { UserVpHistory } from '@/types/member';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: UserVpHistory[];
  pagination: PaginationRes;
  isLoading?: boolean
}>;

const UserVpHistoryTable = ({ data, pagination, isLoading }: Props) => {
  const columns: ColumnDef<UserVpHistory>[] = useMemo(() => {
    const result: ColumnDef<UserVpHistory>[] = [
      {
        accessorKey: 'created_date',
        header: 'Date',
        cell: ({ row }) => {
          return (
            <Typography variant='paragraph-l-regular'>
              {row.original.created_date ? dayjs(row.original.created_date).format('DD MMM, YYYY HH:mm a') : 'n/a'}
            </Typography>
          );
        }
      },
      {
        accessorKey: 'point',
        header: 'VP Earned',
        cell: ({ row }) => {
          return (
            <Typography variant='paragraph-l-regular'>
              {row.original.point || '0'}
            </Typography>
          );
        }
      },
      {
        accessorKey: 'source_name',
        header: 'Details',
        cell: ({ row }) => {
          return (
            <Typography variant='paragraph-l-regular'>
              {row.original.source_name || '-'}
            </Typography>
          );
        }
      },
    ]

    return result
  }, [])

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
        {!isLoading && (
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
        )}
        {isLoading && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading user's VP History ...
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      <Pagination pagination={pagination}
      />
    </div>
  );
};

export default UserVpHistoryTable;