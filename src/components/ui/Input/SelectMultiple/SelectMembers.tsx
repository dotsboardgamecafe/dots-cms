import { MultiValue } from "react-select"

import { getMembers } from "@/lib/api/member"

import { SelectOptionCheckBox, SelectOptionType } from "@/components/ui/Input/SelectMultiple"
import SelectAsync from "@/components/ui/Input/SelectMultiple/async"

import { MemberType } from "@/types/member"
import { Pagination } from "@/types/network"

export type MemberOptionType = SelectOptionType<MemberType>

type Props = {
  value: MultiValue<MemberOptionType>,
  onChange: (data: MultiValue<MemberOptionType>) => void,
  maxSelectable?: number,
  /** user_codes to exclude from the options list, e.g. members already joined the room */
  excludeUserCodes?: string[],
}

function SelectMembers({ value, onChange, maxSelectable, excludeUserCodes }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const page = pagination?.page || 1
    const limit = pagination?.limit || 10
    const payload: Pagination = { page, limit }
    if (search) payload.keyword = search

    try {
      const response = await getMembers({ pagination: payload, query: { status: 'active' } })
      const excluded = new Set(excludeUserCodes)
      const newOptions = response.data
        .filter((member) => !excluded.has(member.user_code))
        .map((member) => ({ value: member.user_code, label: member.username, data: member }))
      const maxPage: number = Math.ceil((response.pagination.count || 0) / (response.pagination.limit || limit))
      const nextPage = (response.pagination.page || page) + 1

      return {
        options: newOptions,
        hasMore: maxPage > (response.pagination.page || page),
        additional: { page: nextPage, limit: response.pagination.limit || limit }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[SelectMembers] failed to load members', error)
      // Retry on next open/scroll instead of permanently locking out further loads.
      return {
        options: [],
        hasMore: true,
        additional: { page, limit }
      }
    }
  }

  const isOptionDisabled = () => Boolean(maxSelectable !== undefined && value.length >= maxSelectable)

  return (
    <SelectAsync<true, MemberOptionType>
      loadOptions={loadOptions}
      placeholder='Search for a member'
      value={value}
      onChange={onChange}
      isSearchable
      isMulti
      isOptionDisabled={isOptionDisabled}
      debounceTimeout={500}
      components={{
        Option: SelectOptionCheckBox,
      }}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
    />
  )
}

export default SelectMembers
