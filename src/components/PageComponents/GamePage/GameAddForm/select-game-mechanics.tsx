'use client'

import { memo, PropsWithChildren, useState } from "react"
import { MultiValue, Options, ValueContainerProps } from "react-select"

import { getGameMechanics } from "@/lib/api/settings"

import { SelectOptionCheckBox, SelectOptionType, SelectValueContainer } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"

import { Pagination } from "@/types/network"
import { GameMechanicType } from "@/types/settings"


export type GameMechanicsOption = SelectOptionType & {
  data?: GameMechanicType
}

type SelectGameMechanicsProps = {
  onChange?: (newValue?: MultiValue<GameMechanicsOption>) => void
  defaultValue?: GameMechanicsOption[]
  id?: string
}

const DisplaySelectedValue: React.FC<PropsWithChildren<ValueContainerProps<SelectOptionType, true>>> = memo(
  (props) => {
    const renderValue = (selectedOptions: Options<unknown>) => {
      const isSelectedMore = selectedOptions.length > 1
      const selectedMoreDisplay = ` +${selectedOptions.length - 1}`
      const firstSelected = selectedOptions[0] as GameMechanicsOption

      return `${firstSelected.label}${isSelectedMore ? selectedMoreDisplay : ''}`
    }
    return <SelectValueContainer renderValue={renderValue} {...props} />
  }
)

const SelectGameMechanics: React.FC<SelectGameMechanicsProps> = ({ onChange, defaultValue, id }) => {
  const [selectedOption, setSelectedOption] = useState<MultiValue<GameMechanicsOption> | undefined>(defaultValue)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadGameOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getGameMechanics({ pagination: { ...payload } })
      const newOptions = response.data.map((category) => ({ value: category.content_value, label: category.content_value, data: category }))

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
  const handleGameBoardChange = (newValue: MultiValue<GameMechanicsOption>) => {
    onChange?.(newValue)
    setSelectedOption(newValue)
  }

  return (
    <SelectAsync<true, GameMechanicsOption>
      id={id}
      loadOptions={loadGameOptions}
      placeholder='Select game mechanics'
      value={selectedOption}
      onChange={(newValue) => handleGameBoardChange(newValue)}
      components={{
        Option: SelectOptionCheckBox,
        ValueContainer: DisplaySelectedValue
      }}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isSearchable
      isMulti
    />
  )
}

export default SelectGameMechanics