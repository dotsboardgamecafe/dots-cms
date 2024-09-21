'use client'

import { useState } from "react"
import { SingleValue } from "react-select"

import { getGameCategories } from "@/lib/api/settings"

import { SelectOptionType } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"

import { Pagination } from "@/types/network"
import { GameCategoryType } from "@/types/settings"


export type GameCategoryOption = SelectOptionType & {
  data?: GameCategoryType
}

type SelectGameCategoryProps = {
  onChange?: (newValue: GameCategoryOption['value'] | undefined, data: GameCategoryOption['data'] | undefined) => void
  defaultValue?: GameCategoryOption
  id?: string
}

const SelectGameCategory: React.FC<SelectGameCategoryProps> = ({ onChange, defaultValue, id }) => {
  const [selectedOption, setSelectedOption] = useState<SingleValue<GameCategoryOption> | undefined>(defaultValue)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getGameCategories({ pagination: { ...payload } })
      const newOptions = response.data.map((category) => ({ value: category.content_value, label: category.content_value, data: category }))

      return {
        options: newOptions,
        hasMore: (response.pagination.total_page || 1) < (response.pagination.page || 1),
        additional: { ...response.pagination, page: (response.pagination.page || 0) + 1 }
      }
    } catch (error) {
      return {
        options: [],
        hasMore: (pagination?.total_page || 1) < (pagination?.page || 1),
        additional: pagination
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGameBoardChange = (newValue: SingleValue<GameCategoryOption>) => {
    onChange?.(newValue?.value, newValue?.data)
    setSelectedOption(newValue)
  }

  return (
    <SelectAsync<false, GameCategoryOption>
      id={id}
      loadOptions={loadOptions}
      placeholder='Select game type'
      value={selectedOption}
      onChange={(newValue) => handleGameBoardChange(newValue)}
      isSearchable
    />
  )
}

export default SelectGameCategory