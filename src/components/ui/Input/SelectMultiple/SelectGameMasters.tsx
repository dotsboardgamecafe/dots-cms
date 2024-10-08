import { useState } from "react"
import { MultiValue, SingleValue } from "react-select"

import { getAdmins } from "@/lib/api/admin"

import { SelectOptionType } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"

import { AdminType } from "@/types/admin"
import { Pagination } from "@/types/network"

export type GameMastersOptionType = SelectOptionType & {
  data?: AdminType
}

type Props<T> = {
  defaultData?: T extends 'multi' ? MultiValue<GameMastersOptionType> : SingleValue<GameMastersOptionType>,
  onChange?: (data: T extends 'multi' ? MultiValue<GameMastersOptionType> : SingleValue<GameMastersOptionType>) => void,
} & (T extends 'multi' ? { isMulti: boolean } : { isMulti?: boolean })

function SelectGameMasters<T>({ onChange, defaultData, isMulti }: Props<T>) {
  const [selectedGameMasters, setSelectedGameMasters] = useState<SingleValue<GameMastersOptionType> | MultiValue<GameMastersOptionType>>(defaultData as SingleValue<GameMastersOptionType> | MultiValue<GameMastersOptionType>)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getAdmins({ pagination: { ...payload }, query: { status: 'active' } })
      const newOptions = response.data.map((admin) => ({ value: admin.admin_code, label: admin.name, data: admin }))
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
  const handleGameMasterChange = (newValue: T extends 'multi' ? MultiValue<GameMastersOptionType> : SingleValue<GameMastersOptionType>) => {
    onChange?.(newValue)
    setSelectedGameMasters(newValue)
  }

  return (
    <SelectAsync<T extends 'multi' ? true : false, GameMastersOptionType>
      loadOptions={loadOptions}
      placeholder='Select game master'
      value={selectedGameMasters}
      onChange={(newValue) => handleGameMasterChange(newValue as T extends 'multi' ? MultiValue<GameMastersOptionType> : SingleValue<GameMastersOptionType>)}
      isSearchable
      isMulti={isMulti as T extends 'multi' ? true : false}
    />
  )

}

export default SelectGameMasters