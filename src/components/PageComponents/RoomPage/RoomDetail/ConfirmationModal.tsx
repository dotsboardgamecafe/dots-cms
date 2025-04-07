'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef } from 'react';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import Typography from '@/components/ui/Typography';


type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  message?: string
  isLoading?: boolean
}>;

const ConfirmationModal = ({ open, onOpenChange, onConfirm, message, isLoading }: Props) => {
  if (!message) return null
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-yellow-500 flex items-center justify-center border-[6px] border-yellow-100'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            {message}
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" disabled={isLoading} onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" disabled={isLoading} loading={isLoading} onClick={onConfirm}>Yes, Continue</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;