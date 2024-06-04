'use client'

import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/Buttons';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { currencyFormat } from '@/helper/string';

import { BadgeType } from '@/types/badge';
import { TournamentDetailType } from '@/types/tournament';

dayjs.extend(dayjsFormats)

type Props = {
  tournamentDetail: TournamentDetailType;
};

const TournamentInfo = ({ tournamentDetail }: Props) => {
  const router = useRouter()

  const tournamentDate = useMemo(() => {
    const startDate = dayjs(tournamentDetail.start_date)
    const endDate = dayjs(tournamentDetail.end_date)
    const currentDate = dayjs(new Date())
    const isSameYear = startDate.year() === endDate.year() && currentDate.year() === endDate.year()
    const isSameMonth = isSameYear && (startDate.month() === endDate.month())

    return `${startDate.format(`MMM, Do${isSameYear ? '' : ' YYYY'}`)} - ${endDate.format(`${isSameMonth ? '' : 'MMM, '}Do${isSameYear ? '' : ' YYYY'}`)}`
  }, [tournamentDetail.start_date, tournamentDetail.end_date])

  const firstWinnerBadge: BadgeType | undefined = tournamentDetail?.tournament_badges.find((badge) => badge.badge_rules[0].value.position === 1)
  const secondWinnerBadge: BadgeType | undefined = tournamentDetail?.tournament_badges.find((badge) => badge.badge_rules[0].value.position === 2)
  const thirdWinnerBadge: BadgeType | undefined = tournamentDetail?.tournament_badges.find((badge) => badge.badge_rules[0].value.position === 3)

  return (
    <div className='grid grid-cols-2 gap-6'>
      <TextLabel title='Tournament Title' value={tournamentDetail.name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Game Name' value={tournamentDetail.game_name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Updated Slot' value={`${tournamentDetail.tournament_participants.length}/${tournamentDetail.player_slot}`} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Date' value={tournamentDate} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Time' value={`${tournamentDetail.start_time}-${tournamentDetail.end_time} WIB`} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Price' value={currencyFormat(tournamentDetail.booking_price)} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Level' value={tournamentDetail.difficulty} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Location' value={tournamentDetail.cafe_address} className='border-b border-gray-200 capitalize' />
      <TextLabel title='1st Place VP' value={`${firstWinnerBadge?.vp_point} Points`} className='border-b border-gray-200 capitalize' />
      <TextLabel title='2nd Place VP' value={`${secondWinnerBadge?.vp_point} Points`} className='border-b border-gray-200 capitalize' />
      <TextLabel title='3nd Place VP' value={`${thirdWinnerBadge?.vp_point} Points`} className='border-b border-gray-200 capitalize' />
      <TextLabel title='All Participant VP' value={`${tournamentDetail.participant_vp} Points`} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Image Prizes' value={(
        <Image src={tournamentDetail.prizes_img_url || '/images/broken-image.png'} alt='tournament-prize' width={375} height={215} className='rounded-xl h-auto max-w-full' />
      )} className='border-b border-gray-200 capitalize' />
      <section className='grid col-span-2'>
        <TextLabel title='Tournament Rules' value={tournamentDetail.tournament_rules} className='border-b border-gray-200 capitalize' />
      </section>
      <section className='grid col-span-2'>
        <Button variant='link' className='text-brand-blue-electric p-0 justify-start' onClick={() => router.push(`/tournament/edit/${tournamentDetail.tournament_code}`)}>
          <Typography variant='text-body-l-regular' className='text-brand-blue-electric'>
            Click here to Edit
          </Typography>
        </Button>
      </section>
    </div>
  );
};

export default TournamentInfo;