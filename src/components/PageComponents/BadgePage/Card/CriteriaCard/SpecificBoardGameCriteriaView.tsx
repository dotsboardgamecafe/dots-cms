
import { useMemo } from 'react';

import { useMultiGameDetail } from '@/lib/api/games/hooks';

import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import Typography from "@/components/ui/Typography"

import { BadgeRuleType, BadgeSpesificGameBoardCriteriaValue } from "@/types/badge"

type Props = {
  data: BadgeRuleType<BadgeSpesificGameBoardCriteriaValue>
}

const SpecificBoardGameCriteriaView: React.FC<Props> = ({ data }) => {
  const gameCodes = data.value.game_code

  const { data: gamesData } = useMultiGameDetail(gameCodes)

  const gameDisplay = useMemo(() => gamesData?.map((game) => `${game.name} ${game.cafe_name}`).join(', ') || '-', [gamesData])

  return (
    <Card>
      <CardHeader>
        <Typography variant='text-body-l-bold'>
          Number of Specific Board Games Played
        </Typography>
      </CardHeader>
      <CardContent>
        <section className='flex gap-2'>
          <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
            Board Games
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
            {gameDisplay}
          </Typography>
        </section>
        <section className='flex gap-2'>
          <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
            Number of Played
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
            {data.value.total_played}
          </Typography>
        </section>
        {data.value.booking_price && (
          <section className='flex gap-2'>
            <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
              Booking Price
            </Typography>
            <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
              {data.value.booking_price}
            </Typography>
          </section>
        )}
      </CardContent>
    </Card>
  )
}

export default SpecificBoardGameCriteriaView