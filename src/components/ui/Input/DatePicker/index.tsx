"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from 'iconsax-react';
import * as React from "react";

import { cn } from "@/lib/utils";

import { Calendar } from '@/components/ui/Calendar';
import InputWrapper from '@/components/ui/Input/InputWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';


export function DatePicker({
  className,
  onChange,
  placeholder = 'Select date',
  value,
  valueFormat
}: { className?: string, placeholder?: string, value?: string, onChange: (date: string) => void, valueFormat?: string }) {
  const [date, setDate] = React.useState<Date | undefined>(value ? new Date(value) : undefined);

  function handleChange(date: Date) {
    setDate(date)
    onChange(format(date, valueFormat || 'yyyy-MM-dd'))
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger>
          <InputWrapper className='justify-between'>
            {date ? (
              format(date, "LLL dd, y")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </InputWrapper>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={new Date()}
            initialFocus
            selected={date}
            onSelect={(_, selectedDay) => handleChange(selectedDay)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker