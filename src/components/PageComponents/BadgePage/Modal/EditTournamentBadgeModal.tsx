import { PropsWithRef } from 'react';

import { editTournamentBadge } from '@/lib/api/badge';
import { useTournamentBadgeDetail } from '@/lib/api/badge/hooks';

import AddTournamentBadgeForm from '@/components/PageComponents/BadgePage/Form/AddTournamentBadgeForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { TournamentBadgePayloadType, TournamentBadgeType } from '@/types/badge';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  badgeCode?: TournamentBadgeType['parent_code'];
}>;

const EditTournamentBadgeModal = ({ open, onOpenChange, badgeCode = '' }: Props) => {
  const { data: badgeDataList } = useTournamentBadgeDetail(badgeCode)
  const badgeDataFirst = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 1)
  const badgeDataSecond = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 2)
  const badgeDataThird = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 3)

  if (!badgeDataFirst || !badgeDataSecond || !badgeDataThird) return null

  function handleSubmitBanner(data: TournamentBadgePayloadType) {
    return editTournamentBadge({ param: badgeCode, body: data })
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
        <AddTournamentBadgeForm
          onClose={() => onOpenChange(false)}
          onSubmit={handleSubmitBanner}
          defaultData={{
            firstPlace: badgeDataFirst,
            secondPlace: badgeDataSecond,
            thirdPlace: badgeDataThird
          }}
        />
      </ModalContent>
    </Modal>
  );
};

export default EditTournamentBadgeModal;