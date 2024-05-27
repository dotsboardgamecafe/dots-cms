'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import { updateCafe } from '@/lib/api/cafes';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { CafeType } from '@/types/cafes';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cafeData?: CafeType;
}>;

const CafeStatusConfirmationModal = ({ open, onOpenChange, cafeData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  if (!cafeData) return null

  const actionNameValue: string = cafeData.status === 'active' ? 'inactive' : 'active'
  const actionNameDisplay: string = cafeData.status === 'active' ? 'inactive' : 'activate'

  const onConfirm = () => {
    setIsSubmitting(true)
    updateCafe({ param: cafeData.cafe_code, body: { ...cafeData, status: actionNameValue } })
      .then(() => {
        toast({
          title: `Cafe successfully ${actionNameDisplay === 'activate' ? 'activated' : 'inactivated'}`,
          variant: 'default',
        });
        onOpenChange(false)
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          description: `failed to ${actionNameDisplay} the cafe`,
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
            Are you sure to {actionNameDisplay} this item?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm} disabled={isSubmitting}>Yes, {actionNameDisplay}</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default CafeStatusConfirmationModal;