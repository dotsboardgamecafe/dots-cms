'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { MedalStar, Trash } from 'iconsax-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { removeRoomParticipant, setRoomWinner } from '@/lib/api/room';

import ConfirmationModal from '@/components/PageComponents/RoomPage/RoomDetail/ConfirmationModal';
import { Button } from '@/components/ui/Buttons';
import { Form } from '@/components/ui/Form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { usePermissions } from '@/helper/context/permissionsContext';

import { JoinedPlayersSchema } from '@/types/game';
import { RoomParticipant, SetRoomWinnerPayload } from '@/types/room';

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
  players: RoomParticipant[]
  endDateTime: string
  roomId: string
};

const isRoomEnded = (dateTime: string) => {
  dayjs.tz.setDefault('Asia/Jakarta')

  const endDate = dayjs.tz(dateTime, 'Asia/Jakarta').unix()
  const currentDate = dayjs().unix()

  dayjs.tz.setDefault()

  return currentDate > endDate
}

const PlayersTab = ({ players, endDateTime, roomId }: Props) => {
  const roomPermission = usePermissions().room

  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false)
  const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
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

  const { fields, remove, update } = useFieldArray({ control: form.control, name: 'players' });

  const handleRemoveParticipants = async () => {
    if (selectedPlayer === undefined || selectedPlayer === null || selectedIndex === undefined || selectedIndex === null) return
    setIsDeleting(true)
    try {
      const res = await removeRoomParticipant({ body: { user_code: selectedPlayer.user_code }, param: roomId })
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_code)

      remove(selectedIndex)
      toast({
        title: `Successfully removed ${selectedPlayer.user_name} from participants`,
        variant: 'default',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Something went wrong',
          description: `failed to remove ${selectedPlayer.user_name} from participants`,
          variant: 'destructive',
        });
      }
    }

    setIsDeleting(false)
    setIsOpenDeleteConfirmation(false)
  }

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
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_code)

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

  const canRemoveParticipants = Boolean(roomPermission?.removeParticipants && !isRoomEnded(endDateTime))

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
                  <TableRow key={player.user_code} className='relative [&>td>div>div]:hover:flex'>
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
                        <div className='absolute hidden top-[50%] translate-y-[-50%] right-2 flex-row justify-center items-center gap-2'>
                          {roomPermission?.setWinner && (
                            !shouldDisableOption(1) && (
                              <Button variant="default" className='gap-4' onClick={(event) => { event.preventDefault(); setIsOpenConfirmation(true); setSelectedIndex(index); setSelectedPlayer(player) }}>
                                <MedalStar />
                                <Typography variant='text-body-l-medium'>
                                  Set as a winner
                                </Typography>
                              </Button>
                            )
                          )}
                          {
                            canRemoveParticipants && (
                              <Button variant="destructive" className='w-fit p-1' onClick={(event) => { event.preventDefault(); setIsOpenDeleteConfirmation(true); setSelectedIndex(index); setSelectedPlayer(player) }}>
                                <Trash />
                              </Button>
                            )
                          }
                        </div>
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
      <ConfirmationModal
        open={isOpenDeleteConfirmation}
        onOpenChange={(isOpen) => setIsOpenDeleteConfirmation(isOpen)}
        onConfirm={() => handleRemoveParticipants()}
        message={`Are you sure to remove ${selectedPlayer?.user_name} from the room?`}
        isLoading={isDeleting}
      />
    </>
  );
};

export default PlayersTab;