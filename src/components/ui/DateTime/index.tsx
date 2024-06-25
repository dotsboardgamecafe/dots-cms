import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { ChangeEvent, PropsWithChildren, PropsWithRef, useRef } from 'react';

import { Calendar } from '@/components/ui/Calendar';
import InputWrapper from '@/components/ui/Input/InputWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

import { parseTime } from '@/helper/parseTime';
dayjs.extend(dayjsFormats);
export type DateTimeProps = {
  start_date?: Date;
  end_date?: Date;
  onDateChange: (date?: Date) => void;
  onEndDateChange: (date?: Date) => void;
};

type Props = PropsWithRef<PropsWithChildren<DateTimeProps>>;

const DateTime = ({ start_date, end_date, onDateChange, onEndDateChange }: Props) => {

  const onChangeStartTime = (evt: ChangeEvent<HTMLInputElement>) => {
    const time = evt.target.value;
    const parsedTime = parseTime(time);
    const selectedDate = dayjs(start_date).set('hours', parsedTime.hour).set('minutes', parsedTime.minutes).toDate();
    onDateChange(selectedDate);
  };

  const onChangeEndTime = (evt: ChangeEvent<HTMLInputElement>) => {
    const time = evt.target.value;
    const parsedTime = parseTime(time);
    let selectedDate = dayjs(start_date).set('hours', parsedTime.hour).set('minutes', parsedTime.minutes).toDate();

    if (start_date && dayjs(start_date).isAfter(selectedDate)) {
      selectedDate = dayjs(selectedDate).set('date', dayjs(selectedDate).get('date') + 1).toDate()
    }
    onEndDateChange(selectedDate);
  };

  const onDateChanged = (value: Date) => {
    const startDate = dayjs(start_date);
    const date = dayjs(value).set('hours', startDate.get('hour') || 0).set('minutes', startDate.get('minutes') || 0).toDate();
    onDateChange(date);
  };

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='w-full'>
          <InputWrapper>
            {start_date && dayjs(start_date).format('ddd Do, HH:mm')} - {end_date && dayjs(end_date).format('HH:mm')}
          </InputWrapper>
        </button>
      </PopoverTrigger>
      <PopoverContent className='popover-content flex items-center xl:items-start lg:flex-col xl:flex-row flex-wrap min-w-[256px]'>
        <Calendar
          mode='single'
          onSelect={(day, selectedDay) => onDateChanged(selectedDay)}
          selected={start_date}
          disabled={{ before: new Date() }}
        />
        <div className='flex lg:justify-between xl:justify-start lg:flex-col gap-2 flex-1'>
          From
          <div onClick={() => fromRef.current?.showPicker()} className='hover:cursor-pointer'>
            <input ref={fromRef} type='time' onChange={onChangeStartTime} className='time-input' value={dayjs(start_date).format('HH:mm')} />
          </div>
          To
          <div onClick={() => toRef.current?.showPicker()} className='cursor-pointer'>
            <input ref={toRef} type='time' onChange={onChangeEndTime} className='time-input' value={dayjs(end_date).format('HH:mm')} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTime;