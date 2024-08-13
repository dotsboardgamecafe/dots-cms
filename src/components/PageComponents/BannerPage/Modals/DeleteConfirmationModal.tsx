'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import { deleteBanner } from '@/lib/api/banner';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { TBannerData } from '@/types/banner';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bannerData?: TBannerData;
}>;

const BannerDeleteConfirmationModal = ({ open, onOpenChange, bannerData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  if (!bannerData) return null

  const onConfirm = async () => {
    setIsSubmitting(true)

    try {
      const res = await deleteBanner(bannerData.banner_code)
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: `Banner successfully deleted`,
        variant: 'default',
      });
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `failed to delete the banner`,
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-brand-blue-electric flex items-center justify-center border-[6px]'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to delete the banner {bannerData.title}?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm} disabled={isSubmitting}>Yes, Delete</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default BannerDeleteConfirmationModal;