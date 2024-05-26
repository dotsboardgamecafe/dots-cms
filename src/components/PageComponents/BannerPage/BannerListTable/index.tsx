'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { usePathname, useRouter } from 'next/navigation';

import PaginationDeprecated from '@/components/ui/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

import { TBannerData } from '@/types/banner';
import { Pagination as PaginationType } from '@/types/network';

dayjs.extend(dayjsFormats);


type Props = {
  data: TBannerData[];
  pagination: PaginationType;
  columnConfig: ColumnDef<TBannerData>[]
};

const BannerListTable = ({ data, pagination, columnConfig }: Props) => {
  const router = useRouter();
  const pathName = usePathname()

  const table = useReactTable({
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns: columnConfig,
  });

  const getMaxPage = () => {
    if (pagination.count && pagination.limit) {
      return Math.ceil(pagination?.count / pagination?.limit);
    }
    return 1;
  };

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
      <PaginationDeprecated
        totalPages={getMaxPage()}
        currentPage={pagination.page}
        itemsPerPage={pagination.limit ?? 0}
        totalItems={pagination.count ?? 0}
        onChangeItemsPerPage={(items) => {
          router.push(`${pathName}?page=1&limit=${items}`);
          table.setPageSize(items);
        }}
        onNext={() => router.push(`${pathName}?page=${(pagination.page ?? 1) + 1}`)}
        onPrevious={() => router.push(`${pathName}?page=${(pagination.page ?? 1) - 1}`)}
        prevDisabled={pagination.page === 1}
        nextDisabled={pagination.page === getMaxPage()}
        onChangePage={(page) => router.push(`${pathName}?page=${page}`)}
        from={table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
        to={table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize}
      />
    </div>
  );
};

export default BannerListTable;