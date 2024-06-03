import { PropsWithRef } from 'react';

import { addTournamentBadge } from '@/lib/api/badge';

import AddTournamentBadgeForm from '@/components/PageComponents/BadgePage/Form/AddTournamentBadgeForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { TournamentBadgePayloadType } from '@/types/badge';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const AddTournamentBadgeModal = ({ open, onOpenChange }: Props) => {
  function handleSubmitBanner(data: TournamentBadgePayloadType) {
    return addTournamentBadge({ body: data })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent hideCloseIcon className='max-w-3xl max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader className='h-fit'>
          <ModalTitle>
            Add New Tournament Badge
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddTournamentBadgeForm onClose={() => onOpenChange(false)} onSubmit={handleSubmitBanner} />
      </ModalContent>
    </Modal>
  );
};

export default AddTournamentBadgeModal;