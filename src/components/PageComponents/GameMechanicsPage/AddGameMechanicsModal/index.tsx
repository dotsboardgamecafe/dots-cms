import { PropsWithRef } from 'react';

import { AddGameMechanicsForm } from '@/components/PageComponents/GameMechanicsPage/AddGameMechanicsForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const AddGameMechanicModal = ({ open, onOpenChange }: Props) => {

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              Add Game Mechanic
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddGameMechanicsForm onClose={() => onOpenChange(false)} />
      </ModalContent>
    </Modal>
  );
};

export default AddGameMechanicModal;