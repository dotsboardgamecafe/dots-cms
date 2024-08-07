'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef } from 'react';

import { editTournament } from '@/lib/api/tournament';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AddTournamentPayload, TournamentType } from '@/types/tournament';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentData?: TournamentType;
}>;

const StatusConfirmationModal = ({ open, onOpenChange, tournamentData }: Props) => {
  const { toast } = useToast()

  if (!tournamentData) return null

  const onConfirm = async () => {
    const payload: AddTournamentPayload = {
      badge_codes: tournamentData.tournament_badges.map((badge) => badge.badge_code),
      booking_price: tournamentData.booking_price,
      end_date: tournamentData.end_date,
      start_date: tournamentData.start_date,
      end_time: tournamentData.end_time,
      game_code: tournamentData.game_code,
      image_url: tournamentData.image_url,
      level: tournamentData.difficulty,
      location_code: tournamentData.cafe_code,
      name: tournamentData.name,
      participant_vp: tournamentData.participant_vp,
      player_slot: tournamentData.player_slot,
      prizes_img_url: tournamentData.prizes_img_url,
      start_time: tournamentData.start_time,
      status: tournamentData.status === 'active' ? 'inactive' : 'active',
      tournament_rules: tournamentData.tournament_rules
    }
    try {
      await editTournament({ param: tournamentData.tournament_code, body: payload });
      toast({
        title: `Successfully delete the Tournament`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `Failed to delete the Tournament`,
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
            Are you sure to delete this tournament?
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

export default StatusConfirmationModal;