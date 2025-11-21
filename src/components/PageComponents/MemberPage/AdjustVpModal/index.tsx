import { PropsWithRef } from 'react';

import { AdjustUserVpForm } from '@/components/PageComponents/MemberPage/AdjustVpModal/adjustment-user-vp';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { MemberType } from '@/types/member';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member_code: MemberType['user_code']
}>;

const AdjustVpModal = ({ open, onOpenChange, member_code }: Props) => {

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              User's VP Adjustment
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AdjustUserVpForm member_code={member_code} onClose={() => onOpenChange(false)} />
      </ModalContent>
    </Modal>
  );
};

export default AdjustVpModal;