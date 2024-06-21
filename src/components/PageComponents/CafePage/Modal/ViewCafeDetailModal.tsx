'use client';
import { PropsWithRef } from 'react';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { CafeType } from '@/types/cafes';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cafeData?: CafeType;
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
}>;

const ViewCafeDetailModal = ({ open, onOpenChange, cafeData, onEdit }: Props) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle className='break-all'>
            {cafeData?.name || '-'}
          </ModalTitle>
        </ModalHeader>
        <div className='gap-6 flex flex-col flex-grow overflow-y-auto'>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Address
            </Typography>
            <Typography variant='paragraph-xl-regular'>
              {cafeData?.address || '-'}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Description
            </Typography>
            <Typography variant='paragraph-xl-regular' className='break-all'>
              {cafeData?.description || '-'}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Status
            </Typography>
            <Typography variant='paragraph-xl-regular' className='capitalize'>
              {cafeData?.status}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section>
            <Button variant='link' className='p-0' onClick={onEdit}>
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

export default ViewCafeDetailModal;