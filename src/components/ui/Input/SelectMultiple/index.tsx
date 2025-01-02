'use client';
import React, { memo, PropsWithChildren, ReactElement, ReactNode, useCallback, useRef } from 'react';
import Select, { components, OptionProps, Options, ValueContainerProps } from 'react-select';

import { cn } from '@/lib/utils';

import Checkbox from '@/components/ui/Input/Checkbox';
import InputWrapper from '@/components/ui/Input/InputWrapper';

export type SelectOptionType<T extends object = object> = {
  label: string,
  value: string,
  data?: T
}

const SelectMultiple = React.forwardRef<
  React.ElementRef<typeof Select<SelectOptionType, true>>,
  React.ComponentPropsWithoutRef<typeof Select<SelectOptionType, true>>
>
  (({ components, ...props }, ref) => {
    const [isClient, setIsClient] = React.useState<boolean>(false)

    React.useEffect(() => {
      setIsClient(true)
    }, [])
    return (
      <InputWrapper className={cn('select', props.isDisabled && 'disabled')}>
        <Select<SelectOptionType, true> {...props}
          ref={ref}
          isMulti
          menuPlacement='auto'
          menuPortalTarget={isClient ? document.body : undefined}
          menuPosition='fixed'
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
              borderRadius: '3px',
              border: 'none',
              minHeight: '0px',
              borderColor: 'transparent',
              boxShadow: 'none',
              cursor: 'pointer',
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
            dropdownIndicator: (base, props) => ({
              ...base,
              padding: '0px',
              display: props.isDisabled ? 'none' : 'flex',
            }),
            menu: (base) => ({
              ...base,
              borderRadius: '8px',
              marginTop: '18px',
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
        />
      </InputWrapper>
    )
  });

const DisplaySelectedValueNotMemoize = <OptionType extends object, T extends boolean = true>(props: PropsWithChildren<ValueContainerProps<SelectOptionType<OptionType>, T>>): ReactElement => {
  const renderValue = (selectedOptions: Options<unknown>) => {
    const isSelectedMore = selectedOptions.length > 1
    const selectedMoreDisplay = ` +${selectedOptions.length - 1}`
    const firstSelected = selectedOptions[0] as SelectOptionType<OptionType>

    return `${firstSelected.label}${isSelectedMore ? selectedMoreDisplay : ''}`
  }
  return <SelectValueContainer renderValue={renderValue} {...props} />
}

export const DisplaySelectedValue = memo(DisplaySelectedValueNotMemoize) as typeof DisplaySelectedValueNotMemoize

export function SelectOptionCheckBox<OptionType = SelectOptionType, isMulti extends boolean = true>
  ({ className, ...props }: OptionProps<OptionType, isMulti>) {
  return (
    <components.Option
      className={cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
      {...props}
    >
      <Checkbox id={props.innerProps.id} label={props.label} checked={props.isSelected} onChange={() => null} onClick={() => null} />
    </components.Option>
  )
}

export const SelectValueContainer = memo(<T extends boolean = true>({ children, renderValue, ...props }: PropsWithChildren<ValueContainerProps<any, T> & { renderValue: (options: Options<unknown>) => ReactNode }>): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { getValue, hasValue } = props
  const childrenLength = React.Children.count(children)
  const lastChildren = React.Children.toArray(children)?.[childrenLength - 1] || null
  const placeholderChildren = !hasValue && (React.Children.toArray(children)?.[0] || null)

  const handleFocus = useCallback(() => {
    if (!containerRef.current) return
    const input = containerRef.current.querySelector('input')
    input?.focus()
  }, [])

  return (
    <div ref={containerRef} onClick={handleFocus}>
      <components.ValueContainer {...props}>
        {placeholderChildren}
        {hasValue && renderValue ? renderValue(getValue()) : children}
        {lastChildren}
      </components.ValueContainer>
    </div>
  )
})

export default SelectMultiple;