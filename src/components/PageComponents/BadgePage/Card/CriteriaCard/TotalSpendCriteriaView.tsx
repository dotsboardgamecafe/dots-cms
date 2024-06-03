import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';

import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import Typography from "@/components/ui/Typography"

import { currencyFormat } from '@/helper/string';

import { BadgeRuleType, BadgeTotalSpendCriteriaValue } from "@/types/badge"
type Props = {
  data: BadgeRuleType<BadgeTotalSpendCriteriaValue>
}

dayjs.extend(dayjsFormats)

const TotalSpendCriteriaView: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <Typography variant='text-body-l-bold'>
          Total Spent
        </Typography>
      </CardHeader>
      <CardContent>
        <section className='flex gap-2'>
          <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
            Amount of Rupiah Spent
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
            {currencyFormat(data.value)}
          </Typography>
        </section>
      </CardContent>
    </Card>
  )
}

export default TotalSpendCriteriaView