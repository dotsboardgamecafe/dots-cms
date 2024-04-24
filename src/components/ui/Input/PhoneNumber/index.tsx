import React from 'react';

import { cn } from '@/lib/utils';

import InputWrapper from '@/components/ui/Input/InputWrapper';

import { InputProps } from '@/types/Inputs';

type Props = React.InputHTMLAttributes<HTMLInputElement> & InputProps;

const PhoneAreaDropdown = () => {
  const areas = [ '+84', '+856', '+81', '+82' ]; // example list
  const [ selected, setSelected ] = React.useState( areas[ 0 ] );
  const [ opened, setOpened ] = React.useState( false );

  return (
    <div className='relative'>
      <button
        type='button'
        className='w-full bg-white rounded-xl border-[1px] border-gray-300 px-[12px] py-[8px] text-sm font-normal text-gray-900 shadow-sm text-left focus:outline-none'
        onClick={ () => setOpened( !opened ) }
      >
        { selected }
      </button>
      <ul id='area-dropdown' className={ cn(
        [
          'absolute right-0 w-full mt-1 bg-white rounded-xl shadow-lg top-full hidden max-h-[100px] overflow-y-auto',
          { 'hidden': !opened }
        ]
      ) }>
        {
          areas.map( area => (
            <li key={ area } className='px-[12px] py-[4px] cursor-pointer'
              onClick={ () => {
                setSelected( area );
                document.getElementById( 'area-dropdown' )?.classList.add( 'hidden' );
              } }
            >
              { area }
            </li>
          ) )
        }
      </ul>
    </div>
  );
};


const PhoneNumber = React.forwardRef<HTMLInputElement, Props>( ( { prefixIcon, suffixIcon, className, ...props }, ref ) => {

  return (
    <div className='w-full flex flex-col gap-2'>
      <InputWrapper className={ className } >
        <PhoneAreaDropdown />
        { prefixIcon }
        <input
          { ...props }
          type='tel'
          className={ cn( [ 'w-full' ] ) }
          onChange={ props.onChange }
          value={ props.value }
          ref={ ref }
          pattern='[0-9]'
        />
        { suffixIcon }
      </InputWrapper>
    </div>
  );
} );

export default PhoneNumber;