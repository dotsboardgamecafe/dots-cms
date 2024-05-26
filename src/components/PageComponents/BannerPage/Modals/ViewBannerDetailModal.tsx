'use client';
import Image from 'next/image';
import { PropsWithRef } from 'react';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { TBannerData } from '@/types/banner';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bannerData?: TBannerData;
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
}>;

const ViewBannerDetailModal = ({ open, onOpenChange, bannerData, onEdit }: Props) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon>
        <div className='gap-6 flex flex-col'>
          <section className='flex flex-col gap-2'>
            <Typography variant='text-body-xl-heavy'>
              {bannerData?.title}
            </Typography>
            <Image src={bannerData?.image_url || '/images/broken-image.png'} width={440} height={170} alt="member-detail-avatar" className='rounded-md object-cover object-center max-h-44' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Category
            </Typography>
            <Typography variant='paragraph-xl-regular'>
              {bannerData?.banner_type || '-'}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Description
            </Typography>
            <Typography variant='paragraph-xl-regular'>
              {bannerData?.description || '-'}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Status
            </Typography>
            <Typography variant='paragraph-xl-regular' className='capitalize'>
              {bannerData?.status}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section>
            <Button variant='link' className='p-0' onClick={onEdit}>
              <Typography variant='paragraph-xl-regular'>
                Click here to Edit
              </Typography>
            </Button>
          </section>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ViewBannerDetailModal;