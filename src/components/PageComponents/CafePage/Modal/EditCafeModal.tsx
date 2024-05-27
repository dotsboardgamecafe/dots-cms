import { PropsWithRef } from 'react';

import { updateCafe } from '@/lib/api/cafes';

import AddCafeForm from '@/components/PageComponents/CafePage/Form/AddCafeForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { CafePayload, CafeType } from '@/types/cafes';
import { CityType, ProvinceType } from '@/types/settings';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultData?: CafeType
  settings: {
    city: CityType[],
    province: ProvinceType[]
  }
}>;

const EditCafeModal = ({ open, onOpenChange, settings, defaultData }: Props) => {
  if (!defaultData) return null

  const handleSubmitCafe = (data: CafePayload) => {
    return updateCafe({ param: defaultData.cafe_code, body: data })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon>
        <ModalHeader>
          <ModalTitle>
            Add New Cafe
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddCafeForm onClose={() => onOpenChange(false)} onSubmit={handleSubmitCafe} settings={settings} defaultData={defaultData} />
      </ModalContent>
    </Modal>
  );
};

export default EditCafeModal;