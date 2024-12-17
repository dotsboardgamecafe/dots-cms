'use client'

import { memo, PropsWithChildren, useState } from "react"
import { MultiValue, Options, ValueContainerProps } from "react-select"

import { getMechanics } from "@/lib/api/mechanic"

import { SelectOptionCheckBox, SelectOptionType, SelectValueContainer } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"

import { MechanicType } from "@/types/mechanics"
import { Pagination } from "@/types/network"


export type GameMechanicsOption = SelectOptionType & {
  data?: MechanicType
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
  const loadOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getMechanics({ pagination: { ...payload } })
      const newOptions = response.data.map((mechanic) => ({ value: mechanic.name, label: mechanic.name, data: mechanic }))
      const maxPage: number = Math.ceil((response.pagination.count || 0) / (response.pagination.limit || 0))

      return {
        options: newOptions,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGameBoardChange = (newValue: MultiValue<GameMechanicsOption>) => {
    onChange?.(newValue)
    setSelectedOption(newValue)
  }

  return (
    <SelectAsync<true, GameMechanicsOption>
      id={id}
      loadOptions={loadOptions}
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