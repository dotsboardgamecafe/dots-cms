import { PropsWithRef } from 'react';

import { addBanners } from '@/lib/api/banner';

import AddBannerForm from '@/components/PageComponents/BannerPage/Forms/AddBannerForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { TPostBannerPayload } from '@/types/banner';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const AddBannerModal = ({ open, onOpenChange }: Props) => {
  function handleSubmitBanner(data: TPostBannerPayload) {
    return addBanners({ body: { ...data, name: data.title } })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader>
          <ModalTitle>
            Add New Banner
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddBannerForm onClose={() => onOpenChange(false)} onSubmit={handleSubmitBanner} />
      </ModalContent>
    </Modal>
  );
};

export default AddBannerModal;