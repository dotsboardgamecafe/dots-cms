'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef } from 'react';

import { updateStatusMembers } from '@/lib/api/room';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  memberData?: AdminType;
}>;

const StatusConfirmationModal = ( { open, onOpenChange, memberData }: Props ) => {


  const onConfirm = async () => {
    await updateStatusMembers( { param: memberData?.admin_code, body: { status: 'inactive' } } );
    onOpenChange( false );
  };

  return (
    <Modal open={ open } onOpenChange={ onOpenChange } >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-brand-blue-electric flex items-center justify-center border-[6px]'>
            <Danger size={ 32 } className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to inactive this item?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={ () => onOpenChange( false ) }>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={ onConfirm }>Yes, Inactive</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default StatusConfirmationModal;