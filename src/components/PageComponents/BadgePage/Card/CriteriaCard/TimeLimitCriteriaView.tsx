import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';

import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import Typography from "@/components/ui/Typography"

import { BadgeRuleType, BadgeTimeLimitCriteriaValue } from "@/types/badge"
type Props = {
  data: BadgeRuleType<BadgeTimeLimitCriteriaValue>
}

dayjs.extend(dayjsFormats)

const TimeLimitCriteriaView: React.FC<Props> = ({ data }) => {
  const isSeasonal = data.category_badge_rule === 'seasonal'

  return (
    <Card>
      <CardHeader>
        <Typography variant='text-body-l-bold'>
          Time Limit
        </Typography>
      </CardHeader>
      <CardContent>
        <section className='flex gap-2'>
          <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
            Category
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
            {data.value.category}
          </Typography>
        </section>
        <section className='flex gap-2'>
          <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
            Start Date
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
            {dayjs(data.value.start_date).format('MMM Do, YYYY')}
          </Typography>
        </section>
        <section className='flex gap-2'>
          <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
            End Date
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
            {dayjs(data.value.end_date).format('MMM Do, YYYY')}
          </Typography>
        </section>
        {isSeasonal && (
          <section className='flex gap-2'>
            <Typography variant='paragraph-l-regular' className='flex-grow basis-0'>
              Event Name
            </Typography>
            <Typography variant='paragraph-xl-regular' className='capitalize flex-grow basis-0'>
              {data.value.name}
            </Typography>
          </section>
        )}
      </CardContent>
    </Card>
  )
}

export default TimeLimitCriteriaView