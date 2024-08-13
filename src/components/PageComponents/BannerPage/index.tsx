'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, Setting4, Trash } from 'iconsax-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import BannerListTable from '@/components/PageComponents/BannerPage/BannerListTable';
import BannerFilterModal from '@/components/PageComponents/BannerPage/FilterModal/BannerFilterModal';
import AddBannerModal from '@/components/PageComponents/BannerPage/Modals/AddBannerModal';
import BannerStatusConfirmationModal from '@/components/PageComponents/BannerPage/Modals/ChangeStatusConfirmationModal';
import BannerDeleteConfirmationModal from '@/components/PageComponents/BannerPage/Modals/DeleteConfirmationModal';
import EditBannerModal from '@/components/PageComponents/BannerPage/Modals/EditBannerModal';
import ViewBannerDetailModal from '@/components/PageComponents/BannerPage/Modals/ViewBannerDetailModal';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { snakeCaseToString } from '@/helper/string';

import { TBannerData } from '@/types/banner';
import { Pagination as PaginationType } from '@/types/network';

type Props = {
  data: TBannerData[];
  pagination: PaginationType;
};

const BannerPageContent = ({ data, pagination }: Props) => {
  const [showAddBannerModal, setShowAddBannerModal] = useState<boolean>(false);
  const [showViewDetailModal, setShowViewDetailModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showChangeStatusConfirmationModal, setShowChangeStatusConfirmationModal] = useState<boolean>(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)

  const [selectedBanner, setSelectedBanner] = useState<TBannerData>();

  const columns: ColumnDef<TBannerData>[] = useMemo(() => [
    {
      accessorKey: 'bannerTitle',
      header: 'Banner Title',
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-4 min-w-64 max-w-xs'>
            <Image src={row.original.image_url || '/images/broken-image.png'} width={73} height={36} alt="banner-image" className='rounded-md object-cover object-center h-9 w-19 flex-shrink-0' />
            <Typography variant='paragraph-l-regular' className='capitalize text-ellipsis overflow-hidden'>
              {row.original.title}
            </Typography>
          </div>
        );
      }
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            {snakeCaseToString(row.original.banner_type)}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular' className='break-words min-w-64 max-w-xs'>
            {row.original.description}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Select value={row.original.status} onValueChange={() => {
            setShowChangeStatusConfirmationModal(true);
            setSelectedBanner(row.original);
          }} >
            <SelectTrigger variant='badge' className={cn(
              {
                'bg-error-50': row.original.status === 'unpublish',
                'bg-blue-50': row.original.status === 'publish'
              }
            )}>
              <SelectValue aria-label={row.original.status} >
                <Typography variant='text-body-l-medium' className={cn(
                  'capitalize',
                  {
                    'text-error-700': row.original.status === 'unpublish',
                    'text-blue-700': row.original.status === 'publish'
                  }
                )}>
                  {row.original.status}
                </Typography>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publish" className='capitalize'>Publish</SelectItem>
              <SelectItem value="unpublish" className='capitalize'>Unpublish</SelectItem>
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
            <Button variant='link' className='p-0' onClick={() => {
              setSelectedBanner(row.original);
              setShowViewDetailModal(true);
            }}>
              <Eye className='cursor-pointer' />
            </Button>
            <Button variant='link' className='p-0' onClick={() => {
              setSelectedBanner(row.original);
              setShowEditModal(true);
            }}>
              <Edit className='cursor-pointer' />
            </Button>
            <Button className='p-0' variant='link' onClick={() => {
              setShowDeleteConfirmationModal(true);
              setSelectedBanner(row.original);
            }}>
              <Trash className='cursor-pointer' />
            </Button>
          </div>
        );
      }
    }
  ]
    , []);


  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Search />
        <Button variant='default' size='lg' onClick={() => setShowAddBannerModal(true)} className='gap-2'>
          <AddCircle className='text-white' />
          <Typography variant='paragraph-l-bold' className='text-white'>
            Add New Banner
          </Typography>
        </Button>
        <button className="rounded-[8px] gap-[8px] px-5 py-3 border-gray-300 border flex flex-row items-center text-nowrap" onClick={() => setIsOpenFilter(true)}>
          <Setting4 />
          <Typography variant='paragraph-l-bold'>
            Filter
          </Typography>
        </button>
      </section>
      <BannerListTable data={data} pagination={pagination} columnConfig={columns} />
      <AddBannerModal open={showAddBannerModal} onOpenChange={(isOpen) => setShowAddBannerModal(isOpen)} />
      <EditBannerModal open={showEditModal} onOpenChange={(isOpen) => setShowEditModal(isOpen)} bannerData={selectedBanner} />
      <BannerStatusConfirmationModal open={showChangeStatusConfirmationModal} onOpenChange={(isOpen) => setShowChangeStatusConfirmationModal(isOpen)} bannerData={selectedBanner} />
      <BannerDeleteConfirmationModal open={showDeleteConfirmationModal} onOpenChange={(isOpen) => setShowDeleteConfirmationModal(isOpen)} bannerData={selectedBanner} />
      <ViewBannerDetailModal
        open={showViewDetailModal}
        onOpenChange={((isOpen) => setShowViewDetailModal(isOpen))}
        bannerData={selectedBanner}
        onEdit={() => {
          setShowViewDetailModal(false);
          setShowEditModal(true);
        }} />
      <BannerFilterModal
        open={isOpenFilter}
        onOpenChange={(isOpenFilter) => setIsOpenFilter(isOpenFilter)}
      />
    </div>
  );
};

export default BannerPageContent;