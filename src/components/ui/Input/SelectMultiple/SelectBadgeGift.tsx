import { useState } from "react"
import { MultiValue, SingleValue } from "react-select"

import { getAvailableUserBadges } from "@/lib/api/badge"

import { SelectOptionType } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"

import { BadgeType } from "@/types/badge"
import { Pagination } from "@/types/network"


type Props<T> = {
  userId: string,
  defaultData?: T extends 'multi' ? MultiValue<SelectOptionType<BadgeType>> : SingleValue<SelectOptionType<BadgeType>>,
  onChange?: (data: T extends 'multi' ? MultiValue<SelectOptionType<BadgeType>> : SingleValue<SelectOptionType<BadgeType>>) => void,
} & (T extends 'multi' ? { isMulti: boolean } : { isMulti?: boolean })

function SelectBadgeGift<T>({ userId, onChange, defaultData, isMulti }: Props<T>) {
  const [selectedBadge, setSelectedBadge] = useState<SingleValue<SelectOptionType<BadgeType>> | MultiValue<SelectOptionType<BadgeType>>>(defaultData as SingleValue<SelectOptionType<BadgeType>> | MultiValue<SelectOptionType<BadgeType>>)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getAvailableUserBadges(userId, { pagination: { ...payload } })
      const newOptions = response.data.map((badge) => ({ value: badge.badge_code, label: badge.name, data: badge }))
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
  const handleBadgeChanges = (newValue: T extends 'multi' ? MultiValue<SelectOptionType<BadgeType>> : SingleValue<SelectOptionType<BadgeType>>) => {
    onChange?.(newValue)
    setSelectedBadge(newValue)
  }

  return (
    <SelectAsync<T extends 'multi' ? true : false, SelectOptionType<BadgeType>>
      loadOptions={loadOptions}
      placeholder='Select badge to gift'
      value={selectedBadge}
      onChange={(newValue) => handleBadgeChanges(newValue as T extends 'multi' ? MultiValue<SelectOptionType<BadgeType>> : SingleValue<SelectOptionType<BadgeType>>)}
      isSearchable
      isMulti={isMulti as T extends 'multi' ? true : false}
    />
  )

}

export default SelectBadgeGift