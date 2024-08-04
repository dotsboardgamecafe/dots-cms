'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { AddCircle, Edit, Trash } from 'iconsax-react';
import { PropsWithRef, useEffect, useState } from 'react';

import AddGameMechanicModal from '@/components/PageComponents/GameMechanicsPage/AddGameMechanicsModal';
import DeleteMechanicConfirmationModal from '@/components/PageComponents/GameMechanicsPage/DeleteConfirmationModal';
import EditGameMechanicModal from '@/components/PageComponents/GameMechanicsPage/EditGameMechanicModal';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import Pagination from '@/components/ui/Pagination/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { MechanicType } from '@/types/mechanics';
import { Pagination as PaginationRes } from '@/types/network';
import { cn } from '@/lib/utils';

type Props = PropsWithRef<{
  data: MechanicType[];
  pagination: PaginationRes;
}>;




const MechanicTable = ({ data, pagination }: Props) => {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<MechanicType>();
  const columns: ColumnDef<MechanicType>[] = [
    {
      accessorKey: 'name',
      header: 'Game Mechanic Name',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.name || '-'}
          </Typography>
        );
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-4 cursor-pointer' >
            <Edit onClick={() => {
              setSelectedRow(row.original)
              setEditModalOpen(true)
            }} />
            <Button className='p-0' variant='link' onClick={() => {
              setConfirmationModalOpen(true);
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

  useEffect(() => {
    if (!pagination.limit) return
    table.setPageSize(pagination.limit)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.limit])

  return (
    <div className='flex flex-col gap-6'>
      <section className={cn('table-action', '!justify-end')}>
        <div className='flex flex-row gap-6'>
          <Button variant="default" size="lg" onClick={() => setAddModalOpen(true)} className="gap-2">
            <AddCircle size={20} />
            <Typography variant='paragraph-l-bold'>
              Add New Game Mechanic
            </Typography>
          </Button>
        </div>
      </section >
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
      <AddGameMechanicModal open={addModalOpen} onOpenChange={(value) => setAddModalOpen(value)} />
      <DeleteMechanicConfirmationModal
        open={confirmationModalOpen}
        onOpenChange={(value) => setConfirmationModalOpen(value)}
        mechanicData={selectedRow}
      />
      <EditGameMechanicModal
        open={editModalOpen}
        onOpenChange={(isOpen) => setEditModalOpen(isOpen)}
        mechanicData={selectedRow}
      />
    </div >
  );
};

export default MechanicTable;