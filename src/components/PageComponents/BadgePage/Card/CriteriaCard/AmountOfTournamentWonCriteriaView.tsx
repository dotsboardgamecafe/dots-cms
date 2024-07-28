


import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import Typography from "@/components/ui/Typography"

import { BadgeRuleType, BadgeTournamentWonCriteriaValue } from "@/types/badge"

type Props = {
  data: BadgeRuleType<BadgeTournamentWonCriteriaValue>
}

const AmountOfTournamentWonCriteriaView: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <Typography variant='text-body-l-bold'>
          Number of Tournaments Won
        </Typography>
      </CardHeader>
      <CardContent>
        <section className='flex gap-2'>
          <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
            Total Won
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
            {data.value}
          </Typography>
        </section>
      </CardContent>
    </Card>
  )
}

export default AmountOfTournamentWonCriteriaView