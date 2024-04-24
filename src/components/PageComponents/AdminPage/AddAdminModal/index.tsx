import { PropsWithRef } from 'react';

import { AddAdminForm } from '@/components/PageComponents/AdminPage/AddAdminForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}>;

const AddAdminModal = ( { open, onOpenChange }: Props ) => {

  return (
    <Modal open={ open } onOpenChange={ onOpenChange } >
      <ModalContent hideCloseIcon>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              Add New Admin
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddAdminForm onClose={ () => onOpenChange( false ) } />
      </ModalContent>
    </Modal>
  );
};

export default AddAdminModal;