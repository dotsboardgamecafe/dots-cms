import { PropsWithRef } from 'react';

import { addBadges } from '@/lib/api/badge';

import AddBadgeForm from '@/components/PageComponents/BadgePage/Form/AddBadgeForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { BadgePostPayloadType } from '@/types/badge';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const AddBadgeModal = ({ open, onOpenChange }: Props) => {
  function handleSubmitBanner(data: BadgePostPayloadType) {
    return addBadges({ body: data })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent hideCloseIcon className='max-w-3xl max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader className='h-fit'>
          <ModalTitle>
            Add New Badge
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddBadgeForm onClose={() => onOpenChange(false)} onSubmit={handleSubmitBanner} />
      </ModalContent>
    </Modal>
  );
};

export default AddBadgeModal;