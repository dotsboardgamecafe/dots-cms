import { groupBy } from "lodash"
import Image from "next/image"
import { useState } from "react"

import { getBadges } from "@/lib/api/badge"

import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/Form"
import InputNumber from "@/components/ui/Input/Number"
import { SelectOptionType } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"
import Text from "@/components/ui/Input/Text"
import Upload from "@/components/ui/Input/Upload"
import Typography from "@/components/ui/Typography"

import { BadgeType } from "@/types/badge"
import { Pagination } from "@/types/network"
import { TournamentDetailType } from "@/types/tournament"

type TournamentOption = SelectOptionType & {
  data: BadgeType<{ position: number }>[]
}

const PrizeForm: React.FC<{ tournamentBadges?: TournamentDetailType['tournament_badges'] }> = ({ tournamentBadges }) => {
  const [selectedTournamentBadge, setSelectedTournamentBadge] = useState<TournamentOption | null>(tournamentBadges ? { value: tournamentBadges[0].badge_code, label: tournamentBadges[0].name, data: tournamentBadges } : null)
  const firstWinnerBadge: BadgeType | undefined = selectedTournamentBadge?.data.find((badge) => badge.badge_rules[0].value.position === 1)
  const secondWinnerBadge: BadgeType | undefined = selectedTournamentBadge?.data.find((badge) => badge.badge_rules[0].value.position === 2)
  const thirdWinnerBadge: BadgeType | undefined = selectedTournamentBadge?.data.find((badge) => badge.badge_rules[0].value.position === 3)

  const form = useFormField()

  const loadBadgeOption = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getBadges({ pagination: { ...payload, limit: 30 }, query: { badge_category: 'tournament', status: 'active' } })
      const groupedBadges = groupBy(response.data, (badgeData) => badgeData.parent_code)
      const newOptions = Object.keys(groupedBadges).map((badgeGroupKey) => {
        const badgeGroupData = groupedBadges[badgeGroupKey]
        const generalBadgeData = badgeGroupData[0]

        return {
          value: badgeGroupKey,
          label: generalBadgeData.name,
          data: badgeGroupData
        }
      }) as unknown

      const maxPage: number = Math.ceil((response.pagination.count || 0) / (response.pagination.limit || 0))

      return {
        options: newOptions as TournamentOption[],
        hasMore: (maxPage) > (response.pagination.page || 1),
        additional: { ...response.pagination, page: (response.pagination.page || 0) + 1 }
      }
    } catch (error) {
      return {
        options: [],
        hasMore: (Math.ceil((pagination?.count || 0) / (pagination?.limit || 0))) > (pagination?.page || 1),
        additional: pagination
      }
    }
  }

  return (
    <section className='form-add-room-wrapper'>
      <FormField
        control={form.control}
        name="tournament_prize.badge_codes"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Select Tournament Badge
              </Typography>
            </FormLabel>
            <FormControl>
              <SelectAsync<false, TournamentOption>
                loadOptions={loadBadgeOption}
                value={selectedTournamentBadge}
                onChange={(selectedBadge) => {
                  field.onChange(selectedBadge?.data.map((badgeDetail) => badgeDetail.badge_code))
                  setSelectedTournamentBadge(selectedBadge)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tournament_prize.participant_vp"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Participant VP
              </Typography>
            </FormLabel>
            <FormControl>
              <InputNumber placeholder='Enter Slot' onChange={(e) => field.onChange(+e.target.value)} value={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div></div>
      <FormField
        control={form.control}
        name="tournament_prize.prizes_img_url"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Upload Prize Image
              </Typography>
            </FormLabel>
            <FormControl>
              <Upload value={field.value} onChange={field.onChange} description="Suggested Resolution 708 x 945 px" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div></div>
      <div></div>
      <Typography variant="heading-h4" color="neutral-ink">
        Preview
      </Typography>
      <div></div>
      <div></div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                1st Place
              </Typography>
            </FormLabel>
            <FormControl>
              <Text value={firstWinnerBadge?.vp_point} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                2nd Place
              </Typography>
            </FormLabel>
            <FormControl>
              <Text value={secondWinnerBadge?.vp_point} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                3rd Place
              </Typography>
            </FormLabel>
            <FormControl>
              <Text value={thirdWinnerBadge?.vp_point} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                First Winner
              </Typography>
            </FormLabel>
            <FormControl>
              <Text value={firstWinnerBadge ? `${firstWinnerBadge.name} - 1st` : ''} disabled prefixIcon={(
                selectedTournamentBadge && <Image width={24} height={24} className="rounded w-6 h-6 object-center object-cover" src={firstWinnerBadge?.image_url || '/images/broken-image.png'} alt="first-banner" />
              )} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Second Winner
              </Typography>
            </FormLabel>
            <FormControl>
              <Text value={secondWinnerBadge ? `${secondWinnerBadge.name} - 2nd` : ''} disabled prefixIcon={(
                selectedTournamentBadge && <Image width={24} height={24} className="rounded w-6 h-6 object-center object-cover" src={secondWinnerBadge?.image_url || '/images/broken-image.png'} alt="second-banner" />
              )} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Third Winner
              </Typography>
            </FormLabel>
            <FormControl>
              <Text value={thirdWinnerBadge ? `${thirdWinnerBadge?.name} - 3rd` : ''} disabled prefixIcon={(
                selectedTournamentBadge && <Image width={24} height={24} className="rounded w-6 h-6 object-center object-cover" src={thirdWinnerBadge?.image_url || '/images/broken-image.png'} alt="third-banner" />
              )} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  )
}

export default PrizeForm