'use client';
import Image from 'next/image';
import { PropsWithRef } from 'react';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import TextLabel from '@/components/ui/TextLabel';
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
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <div className='gap-6 flex flex-col w-full overflow-hidden'>
          <section className='flex flex-col gap-2'>
            <Typography variant='text-body-xl-heavy' className='break-all'>
              {bannerData?.title}
            </Typography>
            <Image src={bannerData?.image_url || '/images/broken-image.png'} width={440} height={170} alt="member-detail-avatar" className='rounded-md object-cover object-center max-h-44' />
          </section>
          <section className='flex flex-col gap-6 flex-grow overflow-y-auto'>
            <TextLabel title='Category' value={bannerData?.banner_type || ''} />
            <TextLabel title='Description' value={bannerData?.description || '-'} />
            <TextLabel title='Status' value={bannerData?.status} />
            <Button variant='link' className='p-0 justify-start' onClick={onEdit}>
              <Typography variant='text-body-l-regular' className='text-brand-blue-electric'>
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