'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { Eye, SearchNormal1, Setting4 } from 'iconsax-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import TierFilterModal from '@/components/PageComponents/TierPage/Modal/TierFilterModal';
import ViewTierModal from '@/components/PageComponents/TierPage/Modal/ViewTierModal';
import { Button } from '@/components/ui/Buttons';
import Text from '@/components/ui/Input/Text';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { Pagination as PaginationType } from '@/types/network';
import { TierType } from '@/types/tier';

dayjs.extend(dayjsFormats);


type Props = {
  data: TierType[];
  pagination: PaginationType;
};

const TierTable = ({ data, pagination }: Props) => {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)
  const [selectedTier, setSelectedTier] = useState<TierType | undefined>()
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const columns: ColumnDef<TierType>[] = useMemo(() => [
    {
      header: 'Name',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {row.original.name}
          </Typography>
        );
      }
    },
    {
      header: 'Min Point',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {row.original.min_point}
          </Typography>
        );
      }
    },
    {
      header: 'Max Point',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.max_point}
          </Typography>
        );
      }
    },
    {
      header: 'Description',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.description}
          </Typography>
        );
      }
    },

    {
      accessorKey: 'status',
      accessorFn: (row) => row.status,
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Select value={row.original.status || 'active'}
            disabled
            onValueChange={() => null}
          >
            <SelectTrigger variant='badge' className={cn(
              {
                'bg-error-50': row.original.status === 'inactive',
                'bg-blue-50': row.original.status === ''
              }
            )}>
              <SelectValue aria-label={row.original.status}>
                <Typography variant='text-body-l-medium' className={cn(
                  'capitalize',
                  {
                    'text-error-700': row.original.status === 'inactive',
                    'text-blue-700': row.original.status === 'active'
                  }
                )}>
                  {row.original.status || 'active'}
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
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-4'>
            <Button variant='link' onClick={() => { setIsOpenDetail(true); setSelectedTier(row.original) }}>
              <Eye className='cursor-pointer' />
            </Button>
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
    manualPagination: true,
    columns,
  });
  const onChangeKeyword = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setKeyword(value);
    const params = new URLSearchParams(searchParams);
    params.set('keyword', value);
    router.push('/tier?' + params.toString());
  };


  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Text className='max-w-[300px]' value={keyword} onChange={onChangeKeyword} prefixIcon={<SearchNormal1 size={20} className='text-gray-500 ' />} placeholder='Search...' />
        <Button variant='outline' size='lg' className='gap-4' onClick={() => setIsOpenFilter(true)}>
          <Setting4 />
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
      <Pagination pagination={pagination} />
      <ViewTierModal
        open={isOpenDetail}
        onOpenChange={(isOpen) => setIsOpenDetail(isOpen)}
        tierData={selectedTier}
      />
      <TierFilterModal open={isOpenFilter} onOpenChange={(isOpen) => setIsOpenFilter(isOpen)} />
    </div>
  );
};

export default TierTable;