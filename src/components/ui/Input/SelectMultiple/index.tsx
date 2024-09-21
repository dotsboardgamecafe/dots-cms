'use client';
import React, { memo, PropsWithChildren, ReactNode, useCallback, useRef } from 'react';
import Select, { components, OptionProps, Options, ValueContainerProps } from 'react-select';

import { cn } from '@/lib/utils';

import Checkbox from '@/components/ui/Input/Checkbox';
import InputWrapper from '@/components/ui/Input/InputWrapper';

export type SelectOptionType = {
  label: string,
  value: string
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
      <InputWrapper >
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
              boxShadow: 'none'
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

export const SelectValueContainer: React.FC<PropsWithChildren<ValueContainerProps<any, true> & { renderValue: (options: Options<unknown>) => ReactNode }>> = memo(({ children, renderValue, ...props }) => {
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