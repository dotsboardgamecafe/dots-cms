'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, Setting4 } from 'iconsax-react';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import GameFilterModal from '@/components/PageComponents/GamePage/GameTable/GameFilterModal';
import StatusConfirmationModal from '@/components/PageComponents/GamePage/GameTable/StatusConfirmationModal';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { GameType } from '@/types/game';
import { Pagination as PaginationType } from '@/types/network';
import { GameCategoryType } from '@/types/settings';

type Props = {
  data: GameType[];
  pagination: PaginationType;
  gameTypes: GameCategoryType[];
};


const GameTable = ({ data, pagination, gameTypes }: Props) => {
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<GameType | undefined>();
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const columns: ColumnDef<GameType>[] = [
    {
      accessorKey: 'name',
      header: 'Game Name',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.name}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'game_type',
      header: 'Type',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {row.original.game_type}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'game_categories',
      header: 'Mechanics',
      cell: ({ row }) => {
        const isHaveMoreTHanOneMechanics = (row.original.game_categories?.length || 0) > 1
        const moreMechanicsDisplay = isHaveMoreTHanOneMechanics && `+${row.original.game_categories?.length}`
        const firstCategory = row.original.game_categories?.[0]

        return (
          <>
            <div className='flex flex-row gap-2 flex-wrap'>
              {firstCategory && (
                <div className='bg-gray-100 rounded-xl px-4'>
                  <Typography variant='paragraph-l-regular' >
                    {firstCategory.category_name}
                  </Typography>
                </div>
              )}
              {(firstCategory && moreMechanicsDisplay) && (
                <div className='bg-gray-100 rounded-xl px-4'>
                  <Typography variant='paragraph-l-regular' >
                    {moreMechanicsDisplay}
                  </Typography>
                </div>
              )}
            </div>
          </>
        );
      }
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.duration} Min
          </Typography>
        );
      }
    },
    {
      accessorKey: 'cafe_name',
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Select value={row.original.status}
            onValueChange={() => {
              setIsOpenChangeStatus(true);
              setSelectedGame(row.original);
            }}
          >
            <SelectTrigger variant='badge' className={cn(
              {
                'bg-error-50': row.original.status === 'inactive',
                'bg-blue-50': row.original.status === 'active'
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
                  {row.original.status}
                </Typography>
              </SelectValue>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
            <Link href={`/game/view/${row.original.game_code}`} >
              <Eye className='cursor-pointer' />
            </Link>
            <Link href={`/game/edit/${row.original.game_code}`} >
              <Edit className='cursor-pointer' />
            </Link>
          </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns,
  });


  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Search />
        <div className='flex flex-row flex-nowrap gap-4'>
          <Link href='/game/add'>
            <button className="rounded-[8px] gap-[8px] px-5 py-3 bg-button-midnight-black flex flex-row items-center text-nowrap">
              <AddCircle className='text-white' />
              <Typography variant='paragraph-l-bold' className='text-white'>
                Add New Game
              </Typography>
            </button>
          </Link>
          <Button variant='outline' size='lg' className='gap-4' onClick={() => setIsOpenFilter(true)}>
            <Setting4 />
            <Typography variant='paragraph-l-bold'>
              Filter
            </Typography>
          </Button>
        </div>
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
        open={isOpenChangeStatus}
        onOpenChange={(isOpen) => setIsOpenChangeStatus(isOpen)}
        gameData={selectedGame}
      />
      <GameFilterModal
        open={isOpenFilter}
        onOpenChange={(isOpen) => setIsOpenFilter(isOpen)}
        gameTypes={gameTypes}
      />
    </div>
  );
};

export default GameTable;