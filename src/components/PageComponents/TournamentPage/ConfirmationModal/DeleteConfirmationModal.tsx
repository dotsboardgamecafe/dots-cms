'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef } from 'react';

import { deleteTournament } from '@/lib/api/tournament';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { TournamentType } from '@/types/tournament';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentData?: TournamentType;
}>;

const DeleteConfirmationModal = ({ open, onOpenChange, tournamentData }: Props) => {
  const { toast } = useToast()

  if (!tournamentData) return null

  const onConfirm = async () => {
    try {
      const res = await deleteTournament(tournamentData.tournament_code);

      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: `Successfully delete the Tournament ${tournamentData.name}`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `Failed to delete the Tournament ${tournamentData.name}`,
        variant: 'destructive',
      });
    }

    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-yellow-500 flex items-center justify-center border-[6px] border-yellow-100'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to delete the tournament {tournamentData.name}?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm}>Yes, Delete</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;