import { PropsWithRef } from 'react';

import AddParticipantsForm from '@/components/PageComponents/TournamentPage/TournamentDetail/AddParticipantsModal/AddParticipantsForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentCode: string;
  availableSlots: number;
  joinedUserCodes: string[];
}>;

const AddParticipantsModal = ({ open, onOpenChange, tournamentCode, availableSlots, joinedUserCodes }: Props) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              Add Participants
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddParticipantsForm tournamentCode={tournamentCode} availableSlots={availableSlots} joinedUserCodes={joinedUserCodes} onClose={() => onOpenChange(false)} />
      </ModalContent>
    </Modal>
  );
};

export default AddParticipantsModal;
