import { PropsWithRef } from 'react';

import { GiftBadgeFom } from '@/components/PageComponents/MemberPage/GiftBadgeModal/GiftBadgeForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { MemberType } from '@/types/member';

type Props = PropsWithRef<{
  member?: MemberType
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const GiftBadgeModal = ({ open, onOpenChange, member }: Props) => {
  if (!member) return null

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              Gift Badge to {member.username}
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <GiftBadgeFom member={member} onClose={() => onOpenChange(false)} />
      </ModalContent>
    </Modal>
  );
};

export default GiftBadgeModal;