"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from 'iconsax-react';
import * as React from "react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Calendar } from '@/components/ui/Calendar';
import InputWrapper from '@/components/ui/Input/InputWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  startDate?: string
  endDate?: string
  onChange?: (range?: DateRange) => void
}

export function DateRangePicker({
  className,
  startDate,
  endDate,
  onChange
}: DateRangePickerProps) {
  const defaultDateValue = React.useMemo(() => {
    if (!startDate && endDate) return
    const value: DateRange = {
      from: startDate ? new Date(startDate) : undefined,
      to: endDate ? new Date(endDate) : undefined
    }

    return value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [date, setDate] = React.useState<DateRange | undefined>(defaultDateValue);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger>
          <InputWrapper className='justify-between'>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </InputWrapper>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date()}
            selected={date}
            onSelect={(range) => { setDate(range); onChange?.(range) }}
            numberOfMonths={2}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}