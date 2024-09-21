import * as React from 'react'
import { GroupBase, OptionsOrGroups } from "react-select"
import { AsyncPaginateProps, LoadOptions } from "react-select-async-paginate"

import { getGameList } from '@/lib/api/games'

import { SelectOptionType } from '@/components/ui/Input/SelectMultiple'
import SelectAsync from '@/components/ui/Input/SelectMultiple/async'

import { GameType } from '@/types/game'
import { Pagination } from '@/types/network'


export type GameOptionType = SelectOptionType & {
  data?: Partial<GameType>
}

function SelectBoardGame<isMulti extends boolean, OptionType = GameOptionType>(props: Omit<AsyncPaginateProps<OptionType, GroupBase<OptionType>, Pagination, isMulti>, 'loadOptions'>) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadGameOptions: LoadOptions<
    OptionType,
    GroupBase<OptionType>,
    Pagination
  > = async (search: string, loadedOptions: any, pagination?: Pagination) => {

    try {
      const response = await getGameList({ pagination: { page: pagination?.page || 1, keyword: search }, query: { status: 'active' } })
      const newOptions: unknown = response.data.map((game) => ({ value: game.game_code, label: `${game.name} ${game.cafe_name}`, data: game }))
      const maxPage: number = Math.ceil((response.pagination.count || 0) / (response.pagination.limit || 0))

      return {
        options: newOptions as OptionsOrGroups<OptionType, GroupBase<OptionType>>,
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
    <SelectAsync<isMulti, OptionType>
      loadOptions={loadGameOptions}
      {...props}
    />
  )
}



export default SelectBoardGame