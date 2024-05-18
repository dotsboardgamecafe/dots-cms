"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from 'iconsax-react';
import * as React from "react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Calendar } from '@/components/ui/Calendar';
import InputWrapper from '@/components/ui/Input/InputWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';


export function DateRangePicker ( {
  className,
}: React.HTMLAttributes<HTMLDivElement> ) {
  const [ date, setDate ] = React.useState<DateRange | undefined>();

  return (
    <div className={ cn( "grid gap-2", className ) }>
      <Popover>
        <PopoverTrigger>
          <InputWrapper className='justify-between'>
            { date?.from ? (
              date.to ? (
                <>
                  { format( date.from, "LLL dd, y" ) } -{ " " }
                  { format( date.to, "LLL dd, y" ) }
                </>
              ) : (
                format( date.from, "LLL dd, y" )
              )
            ) : (
              <span>Pick a date</span>
            ) }
            <CalendarIcon className="mr-2 h-4 w-4" />
          </InputWrapper>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={ new Date() }
            selected={ date }
            onSelect={ setDate }
            numberOfMonths={ 2 }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}