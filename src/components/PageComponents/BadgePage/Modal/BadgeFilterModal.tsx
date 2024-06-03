import { PropsWithRef, useRef } from 'react';

import BadgeFilterForm, { BadgeFilterControlType } from '@/components/PageComponents/BadgePage/Form/BadgeFilterForm';
import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';


type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const BadgeFilterModal = ({ open, onOpenChange }: Props) => {
  const filterControl = useRef<null | BadgeFilterControlType>(null)

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon>
        <ModalHeader className='flex-row align-top justify-between'>
          <ModalTitle>
            Filter
          </ModalTitle>
          <Button variant='link' className='p-0 m-0 h-fit' onClick={() => filterControl.current?.resetFilter()}>
            <Typography variant='text-body-xl-heavy' className='text-brand-red'>
              Reset
            </Typography>
          </Button>
        </ModalHeader>
        <Separator />
        <BadgeFilterForm onClose={() => onOpenChange(false)} control={filterControl} />
      </ModalContent>
    </Modal>
  );
};

export default BadgeFilterModal;