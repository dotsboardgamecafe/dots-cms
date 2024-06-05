'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { MedalStar } from 'iconsax-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { setRoomWinner } from '@/lib/api/room';

import ConfirmationModal from '@/components/PageComponents/RoomPage/RoomDetail/ConfirmationModal';
import { Button } from '@/components/ui/Buttons';
import { Form } from '@/components/ui/Form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { JoinedPlayersSchema } from '@/types/game';
import { RoomParticipant, SetRoomWinnerPayload } from '@/types/room';

type Props = {
  players: RoomParticipant[];
};

const PlayersTab = ({ players }: Props) => {
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false)
  const [selectedPlayer, setSelectedPlayer] = useState<RoomParticipant | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const param = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof JoinedPlayersSchema>>({
    defaultValues: {
      players
    },
    resolver: zodResolver(JoinedPlayersSchema),
  });

  const { fields, append, remove, update } = useFieldArray({ control: form.control, name: 'players' });

  const onSubmit = async (data: z.infer<typeof JoinedPlayersSchema>) => {
    try {
      const body: SetRoomWinnerPayload = {
        room_participant: data.players.map((player) => {
          return {
            user_code: player.user_code,
            position: player.position,
          };
        })
      };
      const res = await setRoomWinner({ body, param: param.room_code as string });
      toast({
        title: 'Successfully set the winner',
        variant: 'default',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Something went wrong',
          description: 'failed to set the winner',
          variant: 'destructive',
        });
      }
    }

  };

  const shouldDisableOption = (currentPosition: number) => {
    return form.getValues('players').some((player) => player.position > 0 && player.position === currentPosition);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Typography variant='text-body-l-medium' className='text-gray-500'>
                    Players
                  </Typography>
                </TableHead>
                <TableHead>
                  <Typography variant='text-body-l-medium' className='text-gray-500'>
                    Additional Info
                  </Typography>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                fields.map((player, index) => (
                  <TableRow key={player.user_code} className='relative [&>td>div>button]:hover:flex'>
                    <TableCell className='py-[10px] flex flex-row items-center gap-3'>
                      <Image alt='player-image' src={player.user_image_url || '/images/avatar-not-found.png'} width={48} height={48} className='rounded-full' />
                      <Typography variant='paragraph-l-regular' className='text-gray-900'>
                        {player.user_name}
                      </Typography>
                      {player.position === 1 && <MedalStar className='text-brand-red' />}
                    </TableCell>
                    <TableCell className='py-[10px]'>
                      <div className='w-full h-full relative'>
                        <Typography variant='paragraph-l-regular' className='text-gray-900 capitalize'>
                          {player.additional_info || '-'}
                        </Typography>
                        {!shouldDisableOption(1) && (
                          <Button variant="default" className='absolute hidden top-[50%] translate-y-[-50%] right-2 gap-4' onClick={(event) => { event.preventDefault(); setIsOpenConfirmation(true); setSelectedIndex(index); setSelectedPlayer(player) }}>
                            <MedalStar />
                            <Typography variant='text-body-l-medium'>
                              Set as a winner
                            </Typography>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
              {fields.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant='paragraph-l-regular' className='text-center'>
                      No players
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </form>
      </Form>
      <ConfirmationModal
        open={isOpenConfirmation && (selectedIndex !== null) && (selectedPlayer !== null)}
        onOpenChange={(isOpen) => setIsOpenConfirmation(isOpen)}
        onConfirm={() => {
          if (selectedIndex === null || selectedPlayer === null) return

          update(selectedIndex, { ...selectedPlayer, position: 1 })
          form.handleSubmit(onSubmit)()
        }}
        message={`Are you sure to set ${selectedPlayer?.user_name} as a winner?`}
      />
    </>
  );
};

export default PlayersTab;