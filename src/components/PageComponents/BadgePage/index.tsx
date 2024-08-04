'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, Setting4, Trash } from 'iconsax-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import AddBadgeModal from '@/components/PageComponents/BadgePage/Modal/AddBadgeModal';
import AddTournamentBadgeModal from '@/components/PageComponents/BadgePage/Modal/AddTournamentBadgeModal';
import BadgeFilterModal from '@/components/PageComponents/BadgePage/Modal/BadgeFilterModal';
import EditBadgeModal from '@/components/PageComponents/BadgePage/Modal/EditBadgeModal';
import EditTournamentBadgeModal from '@/components/PageComponents/BadgePage/Modal/EditTournamentBadgeModal';
import UpdateBadgeStatusConfirmation from '@/components/PageComponents/BadgePage/Modal/UpdateBadgeStatusConfirmation';
import ViewBadgeDetail from '@/components/PageComponents/BadgePage/Modal/ViewBadgeDetailModal';
import ViewTournamentBadgeDetailModal from '@/components/PageComponents/BadgePage/Modal/ViewTournamentBadgeDetailModal';
import BadgeListTable from '@/components/PageComponents/BadgePage/Table/BadgeListTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/ButtonDropdown';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { snakeCaseToString } from '@/helper/string';

import { BadgeRuleType, BadgeType } from '@/types/badge';
import { Pagination as PaginationType } from '@/types/network';

type Props = {
  data: BadgeType[];
  pagination: PaginationType;
};

const BadgePageContent = ({ data, pagination }: Props) => {
  const [statusConfirmationModalOpen, setStatusConfirmationModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<BadgeType>();
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [viewDetailOpen, setViewDetailOpen] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isAddTournamentBadge, setIsAddTournamentBadge] = useState<boolean>(false);
  const [isEditTournamentBadge, setIsEditTournamentBadge] = useState<boolean>(false);
  const [isViewDetailsTournamentBadge, setIsViewDetailsTournamentBadge] = useState<boolean>(false);
  const columns: ColumnDef<BadgeType>[] = useMemo(() => [
    {
      header: 'Badge',
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-4'>
            <Image src={row.original.image_url || '/images/broken-image.png'} width={36} height={36} alt="banner-image" className='rounded-md object-cover object-center h-9 w-9' />
            <Typography variant='paragraph-l-regular' className='capitalize'>
              {row.original.name}
            </Typography>
          </div>

        );
      }
    },
    {
      header: 'Category',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {row.original.badge_category}
          </Typography>
        );
      }
    },
    {
      header: 'Required Criteria',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.badge_category === 'tournament' ? 'Tournament Winner' : getCriteriaDisplay(row.original.badge_rules)}
          </Typography>
        );
      }
    },
    {
      header: 'VP Amount',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {row.original.vp_point}
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
          <Select value={row.original.status} disabled >
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
            <Button variant='link' onClick={() => {
              setSelectedRow(row.original);
              if (row.original.badge_category === 'tournament') return setIsViewDetailsTournamentBadge(true);
              setViewDetailOpen(true);
            }}>
              <Eye className='cursor-pointer' />
            </Button>
            <Button variant='link' onClick={() => {
              setSelectedRow(row.original);
              if (row.original.badge_category === 'tournament') return setIsEditTournamentBadge(true);
              setEditModalOpen(true);
            }}>
              <Edit className='cursor-pointer' />
            </Button>
            {(row.original.status === 'active') && (
              <Button className='p-0' variant='link' onClick={() => {
                setStatusConfirmationModalOpen(true);
                setSelectedRow(row.original);
              }}>
                <Trash className='cursor-pointer' />
              </Button>
            )}
          </div>
        );
      }
    }
  ]
    , []);

  function getCriteriaDisplay(listCriteria?: BadgeRuleType[]): string {
    const criteria: string = snakeCaseToString(listCriteria?.[0].name);
    const numberOfCriteria = listCriteria?.length || 0;

    if (numberOfCriteria <= 1) return criteria || '-';

    return `${criteria}, +${numberOfCriteria - 1}`;
  }

  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Search />
        <div className='flex flex-row flex-nowrap gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger variant='default' size='lg' className='gap-4'>
              <AddCircle className='text-white' />
              <Typography variant='paragraph-l-bold' className='text-white'>
                Add New Badge
              </Typography>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Button variant='ghost' size='md' onClick={() => setAddModalOpen(true)}>Normal Badge</Button>
              <Button variant='ghost' size='md' onClick={() => setIsAddTournamentBadge(true)}>Tournament Badge</Button>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant='outline' size='lg' className='gap-4' onClick={() => setIsOpenFilter(true)}>
            <Setting4 />
            <Typography variant='paragraph-l-bold'>
              Filter
            </Typography>
          </Button>
        </div>
      </section>
      <BadgeListTable data={data} pagination={pagination} columnConfig={columns} />
      <ViewBadgeDetail
        badgeCode={selectedRow?.badge_code}
        open={viewDetailOpen}
        onOpenChange={(isOpenViewDetail: boolean) => setViewDetailOpen(isOpenViewDetail)}
        onEdit={() => {
          setViewDetailOpen(false);
          setEditModalOpen(true);
        }}
      />
      <AddBadgeModal
        onOpenChange={(isopenAddModal: boolean) => setAddModalOpen(isopenAddModal)}
        open={addModalOpen}
      />
      <EditBadgeModal
        onOpenChange={(isopenEditModal: boolean) => setEditModalOpen(isopenEditModal)}
        open={editModalOpen}
        badgeCode={selectedRow?.badge_code}
      />
      <AddTournamentBadgeModal
        onOpenChange={(isOpenAddTournamentBadge) => setIsAddTournamentBadge(isOpenAddTournamentBadge)}
        open={isAddTournamentBadge}
      />
      <ViewTournamentBadgeDetailModal
        onEdit={() => {
          setIsViewDetailsTournamentBadge(false);
          setIsEditTournamentBadge(true);
        }}
        onOpenChange={(isOpenTournamentBadgeDetail) => setIsViewDetailsTournamentBadge(isOpenTournamentBadgeDetail)}
        open={isViewDetailsTournamentBadge}
        badgeCode={selectedRow?.parent_code}
      />
      <EditTournamentBadgeModal
        open={isEditTournamentBadge}
        onOpenChange={(isopen) => setIsEditTournamentBadge(isopen)}
        badgeCode={selectedRow?.parent_code}
      />
      <BadgeFilterModal
        open={isOpenFilter}
        onOpenChange={(isOpen) => setIsOpenFilter(isOpen)}
      />
      <UpdateBadgeStatusConfirmation
        open={statusConfirmationModalOpen}
        onOpenChange={(isOpen) => setStatusConfirmationModalOpen(isOpen)}
        prevStatus={selectedRow?.status as 'active' | 'inactive'}
        id={selectedRow?.badge_category === 'tournament' ? selectedRow.parent_code : selectedRow?.badge_code}
        type={selectedRow?.badge_category === 'tournament' ? 'tournament' : 'normal'}
      />
    </div>
  );
};

export default BadgePageContent;