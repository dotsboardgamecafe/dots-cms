import { PropsWithRef } from 'react';

import { updateBanners } from '@/lib/api/banner';

import AddBannerForm from '@/components/PageComponents/BannerPage/Forms/AddBannerForm';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';

import { TBannerData, TPostBannerPayload } from '@/types/banner';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bannerData?: TBannerData
}>;

const EditBannerModal = ({ open, onOpenChange, bannerData }: Props) => {
  function handleUpdateBanner(data: TPostBannerPayload) {
    return updateBanners({ param: bannerData?.banner_code, body: { ...data, name: data.title } })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon>
        <ModalHeader>
          <ModalTitle>
            Edit Banner
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <AddBannerForm onClose={() => onOpenChange(false)} defaultData={bannerData} onSubmit={handleUpdateBanner} />
      </ModalContent>
    </Modal>
  );
};

export default EditBannerModal;