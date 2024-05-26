'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, SearchNormal1 } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import BannerListTable from '@/components/PageComponents/BannerPage/BannerListTable';
import AddBannerModal from '@/components/PageComponents/BannerPage/Modals/AddBannerModal';
import BannerStatusConfirmationModal from '@/components/PageComponents/BannerPage/Modals/ConfirmationModal';
import EditBannerModal from '@/components/PageComponents/BannerPage/Modals/EditBannerModal';
import ViewBannerDetailModal from '@/components/PageComponents/BannerPage/Modals/ViewBannerDetailModal';
import { Button } from '@/components/ui/Buttons';
import Text from '@/components/ui/Input/Text';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

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
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const [selectedBanner, setSelectedBanner] = useState<TBannerData>();
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  const columns: ColumnDef<TBannerData>[] = useMemo(() => [
    {
      accessorKey: 'bannerTitle',
      header: 'Banner Title',
      cell: ({ row }) => {
        return (
          <div className='flex flex-row items-center gap-4'>
            <Image src={row.original.image_url || '/images/broken-image.png'} width={73} height={36} alt="banner-image" className='rounded-md object-cover object-center h-9 w-19' />
            <Typography variant='paragraph-l-regular' className='capitalize'>
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
            {row.original.banner_type}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'description',
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
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Select value={row.original.status} onValueChange={() => {
            setShowConfirmationModal(true);
            setSelectedBanner(row.original);
          }}>
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
            <Button variant='link' onClick={() => {
              setSelectedBanner(row.original)
              setShowViewDetailModal(true)
            }}>
              <Eye className='cursor-pointer' />
            </Button>
            <Button variant='link' onClick={() => {
              setSelectedBanner(row.original)
              setShowEditModal(true)
            }}>
              <Edit className='cursor-pointer' />
            </Button>
          </div>
        );
      }
    }
  ]
    , []);

  const onChangeKeyword = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setKeyword(value);
    router.push('/room?' + new URLSearchParams({ keyword: value }).toString());
  };

  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Text className='max-w-[300px]' value={keyword} onChange={onChangeKeyword} prefixIcon={<SearchNormal1 size={20} className='text-gray-500 ' />} placeholder='Search...' />

        <Button variant='default' size='lg' onClick={() => setShowAddBannerModal(true)} className='gap-2'>
          <AddCircle className='text-white' />
          <Typography variant='paragraph-l-bold' className='text-white'>
            Add New Banner
          </Typography>
        </Button>
      </section>
      <BannerListTable data={data} pagination={pagination} columnConfig={columns} />
      <AddBannerModal open={showAddBannerModal} onOpenChange={(isOpen) => setShowAddBannerModal(isOpen)} />
      <EditBannerModal open={showEditModal} onOpenChange={(isOpen) => setShowEditModal(isOpen)} bannerData={selectedBanner} />
      <BannerStatusConfirmationModal open={showConfirmationModal} onOpenChange={(isOpen) => setShowConfirmationModal(isOpen)} bannerData={selectedBanner} />
      <ViewBannerDetailModal
        open={showViewDetailModal}
        onOpenChange={((isOpen) => setShowViewDetailModal(isOpen))}
        bannerData={selectedBanner}
        onEdit={() => {
          setShowViewDetailModal(false)
          setShowEditModal(true)
        }} />
    </div>
  );
};

export default BannerPageContent;