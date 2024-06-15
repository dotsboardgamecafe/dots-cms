import { PropsWithRef } from 'react';

import { EditAdminForm } from '@/components/PageComponents/AdminPage/EditAdminForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adminData?: AdminType
}>;

const EditAdminModal = ({ open, onOpenChange, adminData }: Props) => {
  if (!adminData) return null
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              Edit Admin
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <EditAdminForm onClose={() => onOpenChange(false)} adminData={adminData} />
      </ModalContent>
    </Modal>
  );
};

export default EditAdminModal;