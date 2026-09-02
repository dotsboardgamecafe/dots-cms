'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { AddCircle, Trash } from 'iconsax-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { removeTournamentParticipant, setTournamentWinner } from '@/lib/api/tournament';

import ConfirmationModal from '@/components/PageComponents/RoomPage/RoomDetail/ConfirmationModal';
import AddParticipantsModal from '@/components/PageComponents/TournamentPage/TournamentDetail/AddParticipantsModal';
import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField } from '@/components/ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { Positions } from '@/constant/winner_position';
import { usePermissions } from '@/helper/context/permissionsContext';

import { JoinedPlayersSchema } from '@/types/game';
import { SetTournamentWinnerType, TournamentDetailType, TournamentParticipant } from '@/types/tournament';

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
  players: TournamentParticipant[];
  badges: TournamentDetailType['tournament_badges']
  tournamentEndDateTime: string
  playerSlot: number
  currentUsedSlot: number
};

const registrationTypeLabel: Record<TournamentParticipant['additional_info']['registration_type'], string> = {
  self_booking: 'Self Booking',
  manual_admin: 'Manual Admin',
}

const isTournamentEnded = (dateTime: string) => {
  dayjs.tz.setDefault('Asia/Jakarta')

  const endDate = dayjs.tz(dateTime, 'Asia/Jakarta').unix()
  const currentDate = dayjs().unix()

  dayjs.tz.setDefault()

  return currentDate > endDate
}

const TournamentPlayers = ({ players, badges, tournamentEndDateTime, playerSlot, currentUsedSlot }: Props) => {
  const tournamentPermission = usePermissions().tournament
  const [isRemovingParticipants, setIsRemovingParticipants] = useState<boolean>(false)
  const [isOpenRemoveParticipantModal, setIsOpenRemoveParticipantModal] = useState<boolean>(false)
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)
  const [selectedPlayer, setSelectedPlayer] = useState<TournamentParticipant | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const param = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof JoinedPlayersSchema>>({
    defaultValues: {
      players
    },
    resolver: zodResolver(JoinedPlayersSchema),
  });
  const tournamentCode: string = param.tournament_code as string

  const { fields, remove, } = useFieldArray({ control: form.control, name: 'players' });

  useEffect(() => {
    form.reset({ players });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  const onSubmit = async (data: z.infer<typeof JoinedPlayersSchema>) => {
    const firstBadge = badges.find((badge) => badge.badge_rules[0].value.position === 1)
    const secondBadge = badges.find((badge) => badge.badge_rules[0].value.position === 2)
    const thirdBadge = badges.find((badge) => badge.badge_rules[0].value.position === 3)

    const badgeMapping = [firstBadge, secondBadge, thirdBadge]

    try {
      const body: SetTournamentWinnerType = {
        tournament_participant: data.players.map((player) => {
          return {
            user_code: player.user_code,
            position: player.position,
            additional_info: player.additional_info,
            status: player.status,
            badge_code: badgeMapping[player.position - 1]?.badge_code || '',
          };
        })
      };

      await setTournamentWinner({ body, param: tournamentCode });

      toast({
        title: `Successfully set the winner`,
        variant: 'default',
      });

    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Something went wrong',
          description: error.message,
          variant: 'destructive',
        });
      }
    }

  };

  const shouldDisableOption = (currentPosition: number) => {
    return form.getValues('players').some((player) => player.position > 0 && player.position === currentPosition);
  };

  const handleRemoveParticipants = async () => {
    if (selectedPlayer === undefined || selectedPlayer === null || selectedIndex === undefined || selectedIndex === null) return
    setIsRemovingParticipants(true)
    try {
      const res = await removeTournamentParticipant({ body: { user_code: selectedPlayer.user_code }, param: tournamentCode })
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

    setIsRemovingParticipants(false)
    setIsOpenRemoveParticipantModal(false)
  }

  const canRemoveParticipants = Boolean(tournamentPermission?.removeParticipants && !isTournamentEnded(tournamentEndDateTime))
  const availableSlots = playerSlot - currentUsedSlot
  const canAddParticipants = Boolean(tournamentPermission?.addParticipants && !isTournamentEnded(tournamentEndDateTime) && availableSlots > 0)

  return (
    <Form {...form}>
      {canAddParticipants && (
        <div className='flex justify-end mb-4'>
          <Button variant="default" className='gap-2 w-fit' onClick={() => setIsOpenAddModal(true)}>
            <AddCircle />
            <Typography variant='text-body-l-medium'>
              Add Participants
            </Typography>
          </Button>
        </div>
      )}
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
              <TableHead>
                <Typography variant='text-body-l-medium' className='text-gray-500'>
                  Position
                </Typography>
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              fields.map((player, index) => (
                <TableRow key={player.user_code} className='relative [&>td>.remove-btn]:hover:opacity-100'>
                  <TableCell className='py-[10px] flex flex-row items-center gap-3'>
                    <Image alt='player-image' src={player.user_image_url || '/images/avatar-not-found.png'} width={48} height={48} className='rounded-full' />
                    <Typography variant='paragraph-l-regular' className='text-gray-900'>
                      {player.user_name}
                    </Typography>
                  </TableCell>
                  <TableCell className='py-[10px]'>
                    <Typography variant='paragraph-l-regular' className='text-gray-900 capitalize'>
                      {registrationTypeLabel[player.additional_info?.registration_type || 'self_booking']}
                    </Typography>
                  </TableCell>
                  <TableCell className='py-[10px]'>
                    <FormField
                      control={form.control}
                      name={`players.${index}.position`}
                      render={({ field }) => (
                        <FormControl>
                          <Select disabled={!tournamentPermission?.setWinner} defaultValue='na' value={`${field.value}`} onValueChange={(value) => field.onChange(+value)}>
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="N/A" />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                Positions.map(({ position, label }) => (
                                  <SelectItem key={position} value={position.toString()} disabled={shouldDisableOption(position)}>
                                    {label}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell className='py-[10px] px-0' align='center'>
                    {
                      canRemoveParticipants && (
                        <Button variant="destructive" className='w-fit p-1 opacity-0 remove-btn' onClick={(event) => { event.preventDefault(); setIsOpenRemoveParticipantModal(true); setSelectedIndex(index); setSelectedPlayer(player) }}>
                          <Trash />
                        </Button>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        {tournamentPermission?.setWinner && (
          <div className='flex justify-end mt-4'>
            <Button type='submit'>
              Submit Winner
            </Button>
          </div>
        )}
      </form>
      <ConfirmationModal
        open={isOpenRemoveParticipantModal}
        onOpenChange={(isOpen) => setIsOpenRemoveParticipantModal(isOpen)}
        onConfirm={() => handleRemoveParticipants()}
        message={`Are you sure to remove ${selectedPlayer?.user_name} from the tournament?`}
        isLoading={isRemovingParticipants}
      />
      <AddParticipantsModal
        open={isOpenAddModal}
        onOpenChange={setIsOpenAddModal}
        tournamentCode={tournamentCode}
        availableSlots={availableSlots}
        joinedUserCodes={fields.map((player) => player.user_code)}
      />
    </Form>
  );
};

export default TournamentPlayers;