import { PropsWithRef } from 'react';

import { editBadges } from '@/lib/api/badge';
import { useBadgeDetail } from '@/lib/api/badge/hooks';

import AddBadgeForm from '@/components/PageComponents/BadgePage/Form/AddBadgeForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { BadgePostPayloadType, BadgeType } from '@/types/badge';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  badgeCode?: BadgeType['badge_code'];
}>;

const EditBadgeModal = ({ open, onOpenChange, badgeCode = '' }: Props) => {
  const { data: badgeData } = useBadgeDetail(open ? badgeCode : '')

  if (!badgeData) return null

  function handleSubmitBanner(data: BadgePostPayloadType) {
    return editBadges({ param: badgeCode, body: data })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent hideCloseIcon className='max-w-3xl max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader className='h-fit'>
          <ModalTitle>
            Edit Badge
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddBadgeForm onClose={() => onOpenChange(false)} onSubmit={handleSubmitBanner} defaultData={badgeData} />
      </ModalContent>
    </Modal>
  );
};

export default EditBadgeModal;