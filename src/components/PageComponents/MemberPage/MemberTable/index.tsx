'use client';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowCircleDown2, Eye, Gift, HambergerMenu, Magicpen, ReceiptItem, Setting4, Trash } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithRef, useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import DeleteConfirmationModal from '@/components/PageComponents/MemberPage/ConfirmationModal/DeleteConfirmationModal';
import StatusConfirmationModal from '@/components/PageComponents/MemberPage/ConfirmationModal/StatusConfirmationModal';
import MemberDetailModal from '@/components/PageComponents/MemberPage/DetailModal';
import MemberFilterModal from '@/components/PageComponents/MemberPage/FilterModal';
import GiftBadgeModal from '@/components/PageComponents/MemberPage/GiftBadgeModal';
import UserCustomizationModal from '@/components/PageComponents/MemberPage/UserCustomizationModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/ButtonDropdown';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import { useProcessDispatch } from '@/components/ui/Modal/processContext';
import Pagination from '@/components/ui/Pagination/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Typography from '@/components/ui/Typography';

import { usePermissions } from '@/helper/context/permissionsContext';

import { MemberType } from '@/types/member';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: MemberType[];
  pagination: PaginationRes;
}>;

const MemberTable = ({ data, pagination }: Props) => {
  const memberPermissions = usePermissions().member
  const { dispatchAction: dispatchProcess } = useProcessDispatch()

  const [modalGiftBadgeOpen, setModalGiftBadgeOpen] = useState<boolean>(false)
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState<boolean>(false);
  const [changeStatusConfirmationModalOpen, setChangeStatusConfirmationModalOpen] = useState<boolean>(false);
  const [userCustomizationModalOpen, setUserCustomizationModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<MemberType>();
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>();
  const columns: ColumnDef<MemberType>[] = useMemo(() => {
    const result: ColumnDef<MemberType>[] = [
      {
        accessorKey: 'username',
        header: 'User Name',
        cell: ({ row }) => {
          return (
            <section className='flex flex-row items-center gap-2 w-fit min-w-max'>
              <Image
                src={row.original.image_url || '/images/avatar-not-found.png'}
                alt={row.original.username + '-img-pic'}
                width={32}
                height={32}
              />
              <div className='w-3 h-2' style={{ backgroundColor: `${row.original.user_style.color || '#000000'}` }} />
              <Typography variant='paragraph-l-regular' className='flex-shrink-0'>
                {row.original.username || '-'}
              </Typography>
            </section>
          );
        }
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        cell: ({ row }) => {
          return (
            <Typography variant='paragraph-l-regular' className={row.original.gender && 'capitalize'}>
              {row.original.gender || 'n/a'}
            </Typography>
          );
        }
      },
      {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        cell: ({ row }) => {
          return (
            <Typography variant='paragraph-l-regular'>
              {row.original.date_of_birth ? dayjs(row.original.date_of_birth).format('DD MMM, YYYY') : 'n/a'}
            </Typography>
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
              disabled={(row.original.status === 'deleted') || !memberPermissions?.status}
              onValueChange={() => {
                setChangeStatusConfirmationModalOpen(true)
                setSelectedRow(row.original)
                setSelectedRowIndex(row.index)
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
    ]

    if (memberPermissions?.detail || memberPermissions?.viewInvoice || memberPermissions?.delete || memberPermissions?.giftBadge || memberPermissions?.userCustomization) {
      result.push({
        id: 'action',
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className='flex flex-row items-center gap-4' >
              {memberPermissions.detail && (
                <Button className='p-0' variant='link' onClick={() => {
                  onClickDetail(row.original, row.index);
                }}>
                  <Eye />
                </Button>
              )}
              {memberPermissions.giftBadge && (
                <Button className='p-0' variant='link' onClick={() => {
                  openModalGiftBadge(row.original, row.index);
                }}>
                  <Gift />
                </Button>
              )}
              {memberPermissions.viewInvoice && (
                <Link className='p-0' href={`/member/invoices/${row.original.user_code}`}>
                  <ReceiptItem />
                </Link>
              )}
              {memberPermissions.delete && (
                <Button className='p-0' variant='link' onClick={() => {
                  setDeleteConfirmationModalOpen(true);
                  setSelectedRow(row.original);
                  setSelectedRowIndex(row.index);
                }}>
                  <Trash className='cursor-pointer' />
                </Button>
              )}
              {memberPermissions.userCustomization && (
                <Button className='p-0' variant='link' onClick={() => {
                  setUserCustomizationModalOpen(true)
                  setSelectedRow(row.original)
                  setSelectedRowIndex(row.index)
                }} >
                  <Magicpen className='cursor-pointer' />
                </Button>
              )}
            </div>
          );
        }
      })
    }

    return result
  }, [memberPermissions?.delete, memberPermissions?.detail, memberPermissions?.viewInvoice, memberPermissions?.status, memberPermissions?.giftBadge, memberPermissions?.userCustomization])

  const table = useReactTable({
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columns,
  });

  function onClickDetail(row: MemberType, index: number) {
    setDetailModalOpen(true);
    setSelectedRow(row);
    setSelectedRowIndex(index);
  };

  function openModalGiftBadge(row: MemberType, index: number) {
    setModalGiftBadgeOpen(true)
    setSelectedRow(row)
    setSelectedRowIndex(index)
  }

  useEffect(() => {
    if (!pagination.limit) return
    table.setPageSize(pagination.limit)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.limit])

  useEffect(() => {
    if (typeof selectedRowIndex !== 'number') return
    const selectedData = data[selectedRowIndex]
    setSelectedRow(selectedData)
  }, [data])

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
        <DropdownMenu>
          <DropdownMenuTrigger variant='default' size='lg' className='gap-4 bg-transparent text-black !p-0'>
            <HambergerMenu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white border p-0 pr-4'>
            <DropdownMenuItem onClick={() => dispatchProcess('export_member')}>
              <ArrowCircleDown2 />
              <Typography className='grow text-left' variant='paragraph-l-regular'>Export member data to CSV</Typography>
            </DropdownMenuItem>
            {memberPermissions?.exportClaimedHistory && (
              <DropdownMenuItem onClick={() => dispatchProcess('export_all_claimed_history')}>
                <ArrowCircleDown2 />
                <Typography className='grow text-left' variant='paragraph-l-regular'>Export claimed invoice data to CSV</Typography>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
      <GiftBadgeModal
        onOpenChange={(isOpen) => setModalGiftBadgeOpen(isOpen)}
        open={modalGiftBadgeOpen}
        member={selectedRow}
      />
      <UserCustomizationModal
        defaultData={selectedRow}
        onOpenChange={(isOpen) => setUserCustomizationModalOpen(isOpen)}
        open={userCustomizationModalOpen}
      />
    </div>
  );
};

export default MemberTable;