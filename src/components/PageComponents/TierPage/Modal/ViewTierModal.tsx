'use client';
import { PropsWithRef } from 'react';

import { Modal, ModalContent, ModalHeader } from '@/components/ui/Modal';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { TierType } from '@/types/tier';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tierData?: TierType
}>;

const ViewTierModal = ({ open, onOpenChange, tierData }: Props) => {
  if (!tierData) return null

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='gap-6'>
        <ModalHeader className='flex-row items-center gap-4'>
          <Typography variant='text-body-xl-heavy' className='h-fit m-0'>
            {`${tierData.name} Tier`}
          </Typography>
        </ModalHeader>
        <div className='gap-6 flex flex-col'>
          <TextLabel title='Tier Name' value={`${tierData.min_point}-${tierData.max_point} points`} className='border-b border-gray-200 capitalize' />
          <TextLabel title='Description' value={tierData.description} className='border-b border-gray-200 capitalize' />
          <TextLabel title='Status' value={tierData.status || 'active'} className='border-b border-gray-200 capitalize' />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ViewTierModal;