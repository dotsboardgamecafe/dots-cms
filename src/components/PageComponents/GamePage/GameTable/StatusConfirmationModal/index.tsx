'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import { editGame } from '@/lib/api/games';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import Typography from '@/components/ui/Typography';

import { AddGamePayload, GameType } from '@/types/game';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameData?: GameType;
}>;

const StatusConfirmationModal = ({ open, onOpenChange, gameData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  if (!gameData) return null
  const isActive = gameData.status === 'active'
  const onConfirm = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    const payload: AddGamePayload = {
      cafe_code: gameData.cafe_code,
      collection_url: gameData.collection_url,
      description: gameData.description,
      game_categories: gameData.game_categories || [],
      game_type: gameData.game_type,
      image_url: gameData.image_url,
      maximum_participant: gameData.maximum_participant,
      name: gameData.name,
      admin_code: gameData.game_masters?.admin_code || '',
      duration: gameData.duration,
      level: gameData.level,
      status: isActive ? 'inactive' : 'active'
    }

    const res = await editGame({ param: gameData.game_code, body: payload });

    onOpenChange(false);
    setIsSubmitting(false)
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-yellow-500 flex items-center justify-center border-[6px] border-yellow-100'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to delete this game?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm} loading={isSubmitting} disabled={isSubmitting}>Yes, Delete</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default StatusConfirmationModal;