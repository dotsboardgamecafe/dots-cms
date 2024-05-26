'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import { updateBanners } from '@/lib/api/banner';

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

const BannerStatusConfirmationModal = ({ open, onOpenChange, bannerData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  if (!bannerData) return null

  const actionName: string = bannerData.status === 'unpublish' ? 'publish' : 'unpublish'

  const onConfirm = () => {
    setIsSubmitting(true)
    updateBanners({ param: bannerData?.banner_code, body: { ...bannerData, name: bannerData.title, status: actionName } })
      .then(() => {
        toast({
          title: `Banner successfully ${actionName}ed`,
          variant: 'default',
        });
        onOpenChange(false)
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          description: `failed to ${actionName} the banner`,
          variant: 'destructive',
        });
      })
      .finally(() => setIsSubmitting(false))
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-brand-blue-electric flex items-center justify-center border-[6px]'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to {actionName} this item?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm} disabled={isSubmitting}>Yes, {actionName}</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default BannerStatusConfirmationModal;