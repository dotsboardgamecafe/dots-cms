import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';
import { PropsWithChildren, PropsWithRef, useRef } from 'react';

import InputWrapper from '@/components/ui/Input/InputWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

dayjs.extend( dayjsFormats );
export type DateTimeProps = {
  start_time?: string;
  end_time?: string;
  onStartTimeChange: ( date?: string ) => void;
  onEndTimeChange: ( date?: string ) => void;
};

type Props = PropsWithRef<PropsWithChildren<DateTimeProps>>;

const TimeRangeInput = ( { start_time, end_time, onStartTimeChange, onEndTimeChange }: Props ) => {


  const fromRef = useRef<HTMLInputElement>( null );
  const toRef = useRef<HTMLInputElement>( null );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='w-full'>
          <InputWrapper>
            { start_time } - { end_time }
          </InputWrapper>
        </button>
      </PopoverTrigger>
      <PopoverContent className='popover-content flex items-center xl:items-start  flex-row flex-wrap min-w-[256px]'>
        <div className='flex lg:justify-between  lg:flex-row items-center  gap-2 flex-1'>
          From
          <div onClick={ () => fromRef.current?.showPicker() } className='hover:cursor-pointer'>
            <input ref={ fromRef } type='time' onChange={ ( evt ) => onStartTimeChange( evt.target.value ) } className='time-input' value={ start_time } />
          </div>
          To
          <div onClick={ () => toRef.current?.showPicker() } className='cursor-pointer'>
            <input ref={ toRef } type='time' onChange={ ( evt ) => onEndTimeChange( evt.target.value ) } className='time-input' value={ end_time } />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimeRangeInput;