import Link from 'next/link';
import { PropsWithRef } from 'react';

import { AdminFilterForm } from '@/components/PageComponents/AdminPage/FilterForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const AdminFilterModal = ({ open, onOpenChange }: Props) => {

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon>
        <ModalHeader>
          <ModalTitle>
            <div className='flex justify-between items-center'>
              <Typography variant='heading-h4'>
                Filter
              </Typography>
              <Link href="/admin" onClick={() => onOpenChange(false)}>
                <Typography variant='text-body-xl-heavy' className='text-brand-red'>
                  Reset
                </Typography>
              </Link>
            </div>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AdminFilterForm onClose={() => onOpenChange(false)} />
      </ModalContent>
    </Modal>
  );
};

export default AdminFilterModal;