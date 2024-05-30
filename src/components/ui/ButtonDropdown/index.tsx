// your-dropdown-menu.jsx
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, DividerHorizontalIcon } from '@radix-ui/react-icons';
import React from 'react';

import { cn } from '@/lib/utils';

import { ButtonProps, buttonVariants } from '@/components/ui/Buttons';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & ButtonProps
>(
  ({ children, className, variant, size, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Trigger
        ref={forwardedRef}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Trigger>
    )
  });

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={forwardedRef}
          className={cn(
            'flex flex-col bg-gray-300 p-3 rounded-md',
            className
          )}
          {...props}
        >
          {children}
          <DropdownMenuPrimitive.Arrow className='fill-gray-300' />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);

export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.CheckboxItem {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuPrimitive.ItemIndicator>
          {props.checked === 'indeterminate' && <DividerHorizontalIcon />}
          {props.checked === true && <CheckIcon />}
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.RadioItem>
    );
  }
);

export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;