'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { AddCircle, Edit, Trash } from 'iconsax-react';
import { PropsWithRef, useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import AddGameMechanicModal from '@/components/PageComponents/GameMechanicsPage/AddGameMechanicsModal';
import DeleteMechanicConfirmationModal from '@/components/PageComponents/GameMechanicsPage/DeleteConfirmationModal';
import EditGameMechanicModal from '@/components/PageComponents/GameMechanicsPage/EditGameMechanicModal';
import { Button } from '@/components/ui/Buttons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { usePermissions } from '@/helper/context/permissionsContext';

import { MechanicType } from '@/types/mechanics';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: MechanicType[];
  pagination: PaginationRes;
}>;




const MechanicTable = ({ data, pagination }: Props) => {
  const mechanicPermission = usePermissions().mechanics

  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<MechanicType>();

  const columns: ColumnDef<MechanicType>[] = useMemo(() => {
    const result: ColumnDef<MechanicType>[] = [
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

    ]

    if (mechanicPermission?.update || mechanicPermission?.delete) {
      result.push({
        id: 'action',
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className='flex flex-row items-center gap-4 cursor-pointer' >
              {mechanicPermission.update && (
                <Edit onClick={() => {
                  setSelectedRow(row.original)
                  setEditModalOpen(true)
                }} />
              )}
              {mechanicPermission.delete && (
                <Button className='p-0' variant='link' onClick={() => {
                  setConfirmationModalOpen(true);
                  setSelectedRow(row.original);
                }}>
                  <Trash className='cursor-pointer' />
                </Button>
              )}
            </div>
          );
        }
      })
    }

    return result
  }, [mechanicPermission?.update, mechanicPermission?.delete])

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
          {mechanicPermission?.add && (
            <Button variant="default" size="lg" onClick={() => setAddModalOpen(true)} className="gap-2">
              <AddCircle size={20} />
              <Typography variant='paragraph-l-bold'>
                Add New Game Mechanic
              </Typography>
            </Button>
          )}
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