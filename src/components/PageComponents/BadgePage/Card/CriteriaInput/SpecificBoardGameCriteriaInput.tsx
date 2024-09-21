
import { Trash } from "iconsax-react";
import { memo, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { MultiValue, Options, ValueContainerProps } from "react-select";

import { useMultiGameDetail } from "@/lib/api/games/hooks";

import { Button } from "@/components/ui/Buttons";
import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/Form';
import InputNumber from "@/components/ui/Input/Number";
import { SelectOptionCheckBox, SelectOptionType, SelectValueContainer } from "@/components/ui/Input/SelectMultiple";
import { GameOptionType } from "@/components/ui/Input/SelectMultiple/SelectBoardGame";
import SelectBoardGame from "@/components/ui/Input/SelectMultiple/SelectBoardGame";
import Text from '@/components/ui/Input/Text';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import Typography from "@/components/ui/Typography"


const DisplaySelectedCriteria: React.FC<PropsWithChildren<ValueContainerProps<SelectOptionType, true>>> = memo(
  (props) => {
    const renderValue = (selectedOptions: Options<unknown>) => {
      const firstGame = selectedOptions[0] as SelectOptionType
      const moreGame = selectedOptions.length - 1 ? `, +${selectedOptions.length - 1}` : ''

      return firstGame.label + moreGame
    }
    return <SelectValueContainer renderValue={renderValue} {...props} />
  }
)

const SpecificBoardGameCriteriaInput: React.FC<{ parentPath: string, onRemove?: () => void }> = ({ parentPath, onRemove }) => {
  const form = useFormField()
  const [selectedGameBoard, setSelectedGameBoard] = useState<MultiValue<GameOptionType>>()
  const gameListDisplay: string = useMemo(() => selectedGameBoard?.map((game) => game.label).join(', ') || '-', [selectedGameBoard])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gameCodes = useMemo(() => form.getValues(`${parentPath}.game_code`), [])

  const { data: gamesData, isLoading } = useMultiGameDetail(gameCodes)

  const handleGameBoardChange = (newValue: MultiValue<GameOptionType>, callBack: (data: any) => void) => {
    const boardList = newValue.map((value) => value.value)

    callBack(boardList)
    setSelectedGameBoard(newValue)
  }

  useEffect(() => {
    if (isLoading) return

    const selectedGame = gamesData?.map((game) => ({ value: game.game_code, label: game.name + ' ' + game.cafe_name }))
    setSelectedGameBoard(selectedGame)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <Typography variant='text-body-l-bold' className="h-fit">
          Number of Specific Board Games Played
        </Typography>
        <Button variant='link' onClick={() => onRemove?.()}>
          <Trash className="text-brand-red" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <section className="flex flex-row flex-nowrap gap-6">
          <FormField
            control={form.control}
            name={`${parentPath}.game_code`}
            render={({ field }) => (
              <FormItem className="space-y-3 flex-grow basis-0">
                <FormLabel htmlFor={field.name}>
                  <Typography variant='paragraph-l-medium'>
                    Select Game Board
                  </Typography>
                </FormLabel>
                <FormControl>
                  <SelectBoardGame<true>
                    id={field.name}
                    isLoading={(!gamesData && isLoading) ? true : undefined}
                    components={{
                      IndicatorSeparator: () => null,
                      ValueContainer: DisplaySelectedCriteria,
                      Option: SelectOptionCheckBox
                    }}
                    hideSelectedOptions={false}
                    isMulti
                    value={selectedGameBoard}
                    closeMenuOnSelect={false}
                    placeholder='Select game board'
                    onChange={(newValue) => handleGameBoardChange(newValue, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${parentPath}.need_gm`}
            render={({ field }) => (
              <FormItem >
                <FormLabel className='mb-2 block'>
                  <Typography variant='paragraph-l-medium'>
                    Need GM
                  </Typography>
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={(value) => field.onChange(Boolean(value === 'true' ? true : false))}>
                    <SelectTrigger>
                      <SelectValue aria-label={field.value} placeholder='Choose yes or no'>
                        <Typography variant='text-body-l-medium' className="capitalize" >
                          {field.value ? 'Yes' : 'No'}
                        </Typography>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='true'>Yes</SelectItem>
                      <SelectItem value='false'>No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${parentPath}.total_played`}
            render={({ field }) => (
              <FormItem className="space-y-3 flex-grow basis-0">
                <FormLabel>
                  <Typography variant='paragraph-l-medium'>
                    Total Played
                  </Typography>
                </FormLabel>
                <FormControl>
                  <InputNumber placeholder='Enter minimum played' value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormItem className="space-y-3">
          <FormLabel>
            <Typography variant='paragraph-l-medium'>
              Board Game List
            </Typography>
          </FormLabel>
          <FormControl>
            <Text placeholder='Enter badge name' value={gameListDisplay} disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
      </CardContent>
    </Card >
  )
}

export default SpecificBoardGameCriteriaInput