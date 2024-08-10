'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import { deleteGame } from '@/lib/api/games';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { GameType } from '@/types/game';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameData?: GameType;
}>;

const DeleteConfirmationModal = ({ open, onOpenChange, gameData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  if (!gameData) return null

  const onConfirm = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const res = await deleteGame(gameData.game_code);
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: `Successfully delete game ${gameData?.name || ''}`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `failed to delete game ${gameData?.name || ''}`,
        variant: 'destructive',
      });
    }

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
            Are you sure to delete the game {gameData.name}?
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

export default DeleteConfirmationModal;