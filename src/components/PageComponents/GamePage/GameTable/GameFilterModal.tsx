import { PropsWithRef, useRef } from 'react';

import { BadgeFilterControlType } from '@/components/PageComponents/BadgePage/Form/BadgeFilterForm';
import GameFilterForm from '@/components/PageComponents/GamePage/GameTable/GameFilterForm';
import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { GameCategoryType } from '@/types/settings';


type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameTypes: GameCategoryType[]
}>;

const GameFilterModal = ({ open, onOpenChange, gameTypes }: Props) => {
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
        <GameFilterForm onClose={() => onOpenChange(false)} control={filterControl} gameTypes={gameTypes} />
      </ModalContent>
    </Modal>
  );
};

export default GameFilterModal;