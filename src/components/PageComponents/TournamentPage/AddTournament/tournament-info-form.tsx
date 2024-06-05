
import dayjs from "dayjs"
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { useState } from "react"
import { SingleValue } from "react-select"

import { getGameList } from "@/lib/api/games"

import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/Form"
import { DateRangePicker } from "@/components/ui/Input/DateRange"
import InputNumber from "@/components/ui/Input/Number"
import { SelectOptionType } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"
import Text from "@/components/ui/Input/Text"
import Textarea from "@/components/ui/Input/TextArea"
import TimeRangeInput from "@/components/ui/Input/TimeRangeInput"
import Upload from "@/components/ui/Input/Upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import Typography from "@/components/ui/Typography"

import { GameType } from "@/types/game"
import { Pagination } from "@/types/network"
import { TournamentDetailType } from "@/types/tournament";

dayjs.extend(dayjsFormats)

type GameOptionType = SelectOptionType & {
  data: Partial<GameType>,
}

const TournamentInfoForm: React.FC<{ tournamentDetail?: TournamentDetailType }> = ({ tournamentDetail }) => {
  const [selectedGameBoard, setSelectedGameBoard] = useState<SingleValue<GameOptionType>>(tournamentDetail ? { value: tournamentDetail.game_code, label: `${tournamentDetail.game_name} ${tournamentDetail.cafe_name}`, data: { cafe_name: tournamentDetail.cafe_name } } : null)

  const form = useFormField()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadGameOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getGameList({ pagination: { ...payload }, query: { status: 'active' } })
      const newOptions = response.data.map((game) => ({ value: game.game_code, label: `${game.name} ${game.cafe_name}`, data: game }))

      return {
        options: [...loadedOptions, ...newOptions],
        hasMore: (response.pagination.total_page || 1) < (response.pagination.page || 1),
        additional: response.pagination
      }
    } catch (error) {
      return {
        options: loadedOptions,
        hasMore: (pagination?.total_page || 1) < (pagination?.page || 1),
        additional: pagination
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGameBoardChange = (newValue: SingleValue<GameOptionType>, callBack: (data: any) => void) => {
    form.setValue('tournament_info.location', newValue?.data.cafe_code)
    callBack(newValue?.value)
    setSelectedGameBoard(newValue)
  }

  return (
    <section className='form-add-room-wrapper'>
      <FormField
        control={form.control}
        name="tournament_info.name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Tournament Name
              </Typography>
            </FormLabel>
            <FormControl>
              <Text placeholder='Enter Tournament Name' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tournament_info.game_code"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Game Name
              </Typography>
            </FormLabel>
            <FormControl>
              <SelectAsync<false, GameOptionType>
                loadOptions={loadGameOptions}
                placeholder='Select game board'
                value={selectedGameBoard}
                onChange={(newValue) => handleGameBoardChange(newValue, field.onChange)}
                isSearchable
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tournament_info.player_slot"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Player Slot
              </Typography>
            </FormLabel>
            <FormControl>
              <InputNumber placeholder='Enter Slot' onChange={(e) => field.onChange(+e.target.value)} value={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tournament_info.date"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Schedule
              </Typography>
            </FormLabel>
            <FormControl>
              <DateRangePicker startDate={field.value.start_date} endDate={field.value.end_date} onChange={(range) => field.onChange({ start_date: range?.from ? dayjs(range?.from).format('YYYY-MM-DD') : undefined, end_date: range?.to ? dayjs(range?.to).format('YYYY-MM-DD') : undefined })} />
            </FormControl>
            <FormMessage message="Schedule can't be empty" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tournament_info.time"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Time
              </Typography>
            </FormLabel>
            <FormControl>
              <TimeRangeInput
                start_time={field.value.start_time}
                end_time={field.value.end_time}
                onStartTimeChange={(time) => field.onChange({ ...field.value, start_time: time })}
                onEndTimeChange={(time) => field.onChange({ ...field.value, end_time: time })}
              />
            </FormControl>
            <FormMessage message="Time can't be empty" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tournament_info.booking_price"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Price
              </Typography>
            </FormLabel>
            <FormControl>
              <InputNumber prefixIcon="Rp. " placeholder='Set Price' onChange={(event) => field.onChange(Number(event.target.value))} value={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tournament_info.level"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Level
              </Typography>
            </FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue aria-label={field.value} placeholder='Select Level'>
                    <Typography variant='text-body-l-medium' className='capitalize' >
                      {field.value}
                    </Typography>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="master">Master</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormItem className="space-y-3">
        <FormLabel>
          <Typography variant='paragraph-l-medium'>
            Location
          </Typography>
        </FormLabel>
        <FormControl>
          <Text value={selectedGameBoard?.data.cafe_name || ''} placeholder="Please select the game board" disabled />
        </FormControl>
        <FormMessage />
      </FormItem>
      {/* empty div for separator */}
      <div></div>
      <FormField
        control={form.control}
        name="tournament_info.image_url"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Upload Banner
              </Typography>
            </FormLabel>
            <FormControl>
              <Upload value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tournament_info.tournament_rules"
        render={({ field }) => (
          <FormItem className="space-y-3 col-span-2">
            <FormLabel>
              <Typography variant='paragraph-l-medium'>
                Tournament Rules
              </Typography>
            </FormLabel>
            <FormControl>
              <Textarea note='Max 100 characters' placeholder='Game Description...' className='min-h-[225px]' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  )
}

export default TournamentInfoForm