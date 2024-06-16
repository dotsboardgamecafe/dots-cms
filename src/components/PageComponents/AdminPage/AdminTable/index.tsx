'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, Setting4 } from 'iconsax-react';
import Image from 'next/image';
import { PropsWithRef, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import AddAdminModal from '@/components/PageComponents/AdminPage/AddAdminModal';
import AdminDetailModal from '@/components/PageComponents/AdminPage/DetailModal';
import EditAdminModal from '@/components/PageComponents/AdminPage/EditAdminModal';
import AdminFilterModal from '@/components/PageComponents/AdminPage/FilterModal';
import StatusConfirmationModal from '@/components/PageComponents/AdminPage/StatusConfirmationModal';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { EnhancedPermissionType } from '@/helper/hooks/usePermissions';

import { AdminType } from '@/types/admin';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: AdminType[];
  pagination: PaginationRes;
  adminPermissions: EnhancedPermissionType
}>;




const AdminTable = ({ data, pagination, adminPermissions }: Props) => {

  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<AdminType>();
  const columns: ColumnDef<AdminType>[] = [
    {
      accessorKey: 'name',
      header: 'Admin Name',
      cell: ({ row }) => {
        return (
          <section className='flex flex-row items-center gap-[10px]'>
            <Image
              src={row.original.image_url || '/images/avatar-not-found.png'}
              alt={row.original.name + '-img-pic'}
              width={32}
              height={32}
              className='rounded-full object-cover object-center h-8 w-8'
            />
            <Typography variant='paragraph-l-regular'>
              {row.original.name || '-'}
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
            {row.original?.phone_number || '-'}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Select disabled={!adminPermissions['admin-update-status']} value={row.original.status} onValueChange={(value) => {
            setConfirmationModalOpen(true);
            setSelectedRow(row.original);
          }}>
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
          <div className='flex flex-row items-center gap-4 cursor-pointer' >
            <Eye onClick={() => {
              onClickDetail(row.original);
            }} />
            {adminPermissions['admin-update'] && (
              <Edit onClick={() => {
                setSelectedRow(row.original)
                setEditModalOpen(true)
              }} />
            )}
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

  const onClickDetail = (row: AdminType) => {
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
        <div className='flex flex-row gap-6'>
          {adminPermissions['admin-add'] && (
            <Button variant="default" size="lg" onClick={() => setAddModalOpen(true)} className="gap-2">
              <AddCircle size={20} />
              <Typography variant='paragraph-l-bold'>
                Add New Admin
              </Typography>
            </Button>
          )}
          <Button variant="secondary" size="md" onClick={() => setFilterModalOpen(true)}>
            <Setting4 size={20} />
            <Typography variant='paragraph-l-bold'>
              Filter
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
      <Pagination pagination={pagination} />
      <AdminFilterModal open={filterModalOpen} onOpenChange={(value) => setFilterModalOpen(value)} />
      <AdminDetailModal
        open={detailModalOpen}
        onOpenChange={(value) => setDetailModalOpen(value)}
        adminData={selectedRow}
        onEdit={() => {
          setDetailModalOpen(false)
          setEditModalOpen(true)
        }}
      />
      <AddAdminModal open={addModalOpen} onOpenChange={(value) => setAddModalOpen(value)} />
      <StatusConfirmationModal
        open={confirmationModalOpen}
        onOpenChange={(value) => setConfirmationModalOpen(value)}
        memberData={selectedRow}
      />
      <EditAdminModal
        open={editModalOpen}
        onOpenChange={(isOpen) => setEditModalOpen(isOpen)}
        adminData={selectedRow}
      />
    </div >
  );
};

export default AdminTable;