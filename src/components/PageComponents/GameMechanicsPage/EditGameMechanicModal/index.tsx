import { PropsWithRef } from 'react';

import { EditGameMechanicForm } from '@/components/PageComponents/GameMechanicsPage/EditGameMechanicForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { MechanicType } from '@/types/mechanics';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mechanicData?: MechanicType
}>;

const EditGameMechanicModal = ({ open, onOpenChange, mechanicData }: Props) => {
  if (!mechanicData) return null
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              Edit Game Mechanic
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <EditGameMechanicForm onClose={() => onOpenChange(false)} mechanicData={mechanicData} />
      </ModalContent>
    </Modal>
  );
};

export default EditGameMechanicModal;