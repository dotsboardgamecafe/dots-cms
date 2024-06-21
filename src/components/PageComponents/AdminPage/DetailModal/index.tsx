'use client';
import Image from 'next/image';
import { PropsWithRef } from 'react';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  adminData?: AdminType;
}>;

const AdminDetailModal = ({ open, onOpenChange, adminData, onEdit }: Props) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <div className='gap-4 flex flex-col overflow-hidden'>
          <section className='flex flex-row items-center gap-3'>
            <Image src={adminData?.image_url || '/images/avatar-not-found.png'} alt="member-detail-avatar" width={52} height={52} className='rounded-full w-[52px] h-[52px] object-cover object-center' />
            <Typography variant='heading-h4'>
              {adminData?.name}
            </Typography>
          </section>
          <Separator />
          <section className='flex flex-col gap-4 overflow-y-auto'>
            <TextLabel title='Username' value={adminData?.user_name} />
            <TextLabel title='Email Address' value={adminData?.email} />
            <TextLabel title='Phone Number' value={adminData?.phone_number || '-'} />
            <TextLabel title='Status' value={adminData?.status} className='capitalize' />
            <Separator />
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

export default AdminDetailModal;