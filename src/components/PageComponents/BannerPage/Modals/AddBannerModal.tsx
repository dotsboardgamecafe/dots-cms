import { PropsWithRef } from 'react';

import { addBanners } from '@/lib/api/banner';

import AddBannerForm from '@/components/PageComponents/BannerPage/Forms/AddBannerForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

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
      <ModalContent hideCloseIcon>
        <ModalHeader>
          <ModalTitle>
            <Typography variant='heading-h4'>
              Add New Banner
            </Typography>
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddBannerForm onClose={() => onOpenChange(false)} onSubmit={handleSubmitBanner} />
      </ModalContent>
    </Modal>
  );
};

export default AddBannerModal;