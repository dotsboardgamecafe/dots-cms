import * as React from 'react'
import { GroupBase } from "react-select"
import { AsyncPaginate, AsyncPaginateProps } from "react-select-async-paginate"

import { SelectOptionType } from '@/components/ui/Input/SelectMultiple'

import { Pagination } from '@/types/network'

function SelectAsync<isMulti extends boolean, OptionType = SelectOptionType, Additional = Pagination>({ components, ...props }: AsyncPaginateProps<OptionType, GroupBase<OptionType>, Additional, isMulti>) {
  return (
    <AsyncPaginate
      {...props}
      components={{
        IndicatorSeparator: () => null,
        ...components
      }}
      styles={{
        container: (base) => ({
          ...base,
          width: '100%',
          minHeight: '0px',
          padding: '0px'
        }),
        indicatorSeparator: (base) => ({
          ...base,
          marginTop: '0px',
          marginBottom: '0px'
        }),
        indicatorsContainer: (base) => ({
          ...base,
          padding: '0px',
        }),
        clearIndicator: (base) => ({
          ...base,
          padding: '0px',
        }),
        control: (base) => ({
          ...base,
          borderRadius: '0.75rem',
          border: '1px solid',
          padding: '10px 14px',
          borderTopColor: 'rgb(208 213 221 / var(--tw-border-opacity))',
          borderBottomColor: 'rgb(208 213 221 / var(--tw-border-opacity))',
          borderRightColor: 'rgb(208 213 221 / var(--tw-border-opacity))',
          borderLeftColor: 'rgb(208 213 221 / var(--tw-border-opacity))'
        }),
        valueContainer: (base) => ({
          ...base,
          padding: '0px'
        }),
        input: (base) => ({
          ...base,
          padding: '0px',
          margin: '0px'
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: '0px',
        }),
        menu: (base) => ({
          ...base,
          borderRadius: '8px',
          zIndex: '999',
          pointerEvents: 'auto'
        }),
        option: (base, { isSelected, isFocused, isDisabled }) => {
          const backgroundColor = (isSelected && isFocused) ? 'hsl(var(--accent))' : undefined
          const opacity = isDisabled ? '0.5' : '1'

          return ({
            ...base,
            ...({ backgroundColor, opacity }),
            color: 'black',
          })
        },
        menuPortal: (base) => ({ ...base, zIndex: 999, height: 'fit-content', pointerEvents: 'auto' })
      }}
      menuPlacement='auto'
      menuPortalTarget={document.body}
      menuPosition='fixed'
    />
  )
}

export default SelectAsync