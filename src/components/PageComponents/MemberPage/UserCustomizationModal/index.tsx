import { PropsWithRef } from 'react';

import { updateUserCustomization } from '@/lib/api/member';

import UserCustomizationForm from '@/components/PageComponents/MemberPage/UserCustomizationModal/user-customization-form';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { MemberType, UserCustomization } from '@/types/member';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultData?: MemberType
}>;

const UserCustomizationModal = ({ open, onOpenChange, defaultData }: Props) => {
  if (!defaultData) return null

  const handleSubmitUserCustomization = (data: UserCustomization) => {
    return updateUserCustomization(defaultData.user_code, data)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle>
            Customize User
          </ModalTitle>
        </ModalHeader>
        <Separator />
        {open && (
          <UserCustomizationForm defaultData={defaultData} onClose={() => onOpenChange(false)} onSubmit={handleSubmitUserCustomization} />
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserCustomizationModal;