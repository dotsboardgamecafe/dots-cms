import { PropsWithRef } from 'react';

import { addCafe } from '@/lib/api/cafes';

import AddCafeForm from '@/components/PageComponents/CafePage/Form/AddCafeForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { CafePayload } from '@/types/cafes';
import { CityType, ProvinceType } from '@/types/settings';


type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: {
    city: CityType[],
    province: ProvinceType[]
  }
}>;

const AddCafeModal = ({ open, onOpenChange, settings }: Props) => {
  function handleSubmitCafe(data: CafePayload) {
    return addCafe({ body: { ...data } })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle>
            Add New Cafe
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddCafeForm onClose={() => onOpenChange(false)} onSubmit={handleSubmitCafe} settings={settings} />
      </ModalContent>
    </Modal>
  );
};

export default AddCafeModal;