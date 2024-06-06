'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';

import Pagination from '@/components/ui/Pagination/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { InvoiceType } from '@/types/member';
import { Pagination as PaginationType } from '@/types/network';

dayjs.extend(dayjsFormats);


type Props = {
  data: InvoiceType[];
  pagination: PaginationType;
  columnConfig: ColumnDef<InvoiceType>[];
};

const ClaimHistoryTable = ({ data, pagination, columnConfig }: Props) => {
  const table = useReactTable({
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns: columnConfig,
  });

  return (
    <div className='flex flex-col gap-6'>
      <section className='flex flex-col pt-4 border-t-2'>
        <Typography variant='heading-h4' color='neutral-ink'>
          Claim History
        </Typography>
        <Typography variant='paragraph-l-regular' color='neutral-ink'>
          User Claim Invoice History
        </Typography>
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
              <TableCell colSpan={columnConfig.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination pagination={pagination} />
    </div>
  );
};

export default ClaimHistoryTable;